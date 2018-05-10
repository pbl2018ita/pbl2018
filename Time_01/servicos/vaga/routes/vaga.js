var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var router = express.Router();

var kafka = require('kafka-node')
var Producer = kafka.Producer
var client = new kafka.Client("stagihobd.hashtagsource.com:2181")
var producer = new Producer(client);

var topico = "cross";
var topicoOnline = false ;

var vagas;
var especialista;
var plantonista;

// Configurando o Kafka
producer.on('ready', function () {
    console.log("Producer para VAGA está pronto, no tópico 'cross'");
    topicoOnline = true;
});

producer.on('error', function (err) {
  console.error("Não foi possível iniciar o Producer do Kafka"+err);
});

// Configurando a view, quando chamando o '/'
router.get('/', function(req, res, next) {
  res.render('index', { title: 'VAGA | Express' });
});

function ProcessarPlantonista(callback, res){
  var url = "https://pbl2018-hospital-plantonista.herokuapp.com/api/plantonista";
  request.get(url, (error, response, body) => {
    var plantonista = JSON.parse(body);
    callback(body, res);
  });
}

function retornoProcessar(body, res){
  vagas = JSON.parse(body)["hospital"]["leitos"]
  vagas = { "from": "hc",
            "to": "cross",
            "content":{
              "hospital":{
                  "identificador": "123456",
                  "nome": "hc",
                  "leitos": vagas
                }
            }
        };

  if (especialista)
    ProcessarPlantonista(retornoProcessarPlantonista, res);
}

function retornoProcessarEspecialista(body, res){
  especialista = JSON.parse(body);
  if (vagas)
    ProcessarPlantonista(retornoProcessarPlantonista, res);
}

function ProcessarEspecialista(callback, res){
  // TODO: criar uma nova aplicação
  // var url = https://pbl2018-hospital-especialista.herokuapp.com

  var url = "https://stagihobd-ts01.herokuapp.com/api/especialistas/disponivel"
  request.get(url, (error, response, body) => {
      // var especialista = JSON.parse(body);
      callback(body, res);
  });
}

function Processar(callback, res){
  var url = "https://stagihobd-ts02.herokuapp.com/leitos?hospital=hc&status=livre"
  // TODO: Publicar uma nova aplicação
  // var url = "https://stagihobd-hospital-leito.herokuapp.com";

  request.get(url, (error, response, body) => {
      /*
        console.log("\n\n\n\n[Processar()]\n\n\n");
        console.log(body);
        console.log("\n\n\n\n");
      */
      callback(body, res);
    });
}

function processarVagas(){

  for (p in plantonista){
    for (e in especialista){

      if (plantonista[p].crm != especialista[e]._id)
        return

      vagas["content"]["hospital"]["plantonista"] = especialista[e];
      return vagas;
    }
  }

}

function retornoProcessarPlantonista(body, res){
  plantonista = JSON.parse(body);
  processarVagas();

  // TODO: Refatorar
  if (topicoOnline){
    try {
      sendMessageKafka(topico, JSON.stringify(vagas));
      res.status(200).send({ result: "ok"});
    } catch (err) {
      console.error(err);
      res.status(500).send({result: "fail"});
    }
  }
  else {
    res.status(500).send({result: "fail - serviço kafka não está online"});
  }

}

// enviar mensagem ao Kafka
function sendMessageKafka(topic, msg) {
    payloads = [ { topic: topic, messages: msg } ];

    if (topicoOnline) {
      producer.send(payloads, function (err, data) {
          console.log(data);
      });
    } else {
        console.error("desculpe, topico 'cross' não está pronto, falha ao enviar a mensagem ao Kafka.");
    }
}

// VAGA = leito + especialista + plantonista
router.get('/vagas', function(req, res) {
    Processar(retornoProcessar, res);
    ProcessarEspecialista(retornoProcessarEspecialista, res);
});

module.exports = router;
