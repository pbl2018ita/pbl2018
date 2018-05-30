var express = require('express');
var request = require('request');
var router = express.Router();

var kafka = require('kafka-node')
var Producer = kafka.Producer
var client = new kafka.Client("stagihobd.hashtagsource.com:2181")
var producer = new Producer(client);

var topico = "vagas";
var topicoOnline = false ;

var especialista;
var plantonista;
var leito;

// Configurando a view, quando chamando o '/'
router.get('/', function(req, res, next) {
  res.render('index', { title: 'VAGA | Express' });
});

// Kafka
producer.on('ready', function () {
  console.log("Producer para VAGA está pronto, no tópico '" + topico + "'");
  topicoOnline = true;
});

producer.on('error', function (err) {
  console.error("Não foi possível iniciar o Producer do Kafka"+err);
});

// enviar mensagem ao Kafka
function sendMessageKafka(topic, msg) {
  payloads = [ { topic: topic, messages: msg } ];

  if (topicoOnline) {
    producer.send(payloads, function (err, data) {
        console.log(data);
    });
  } else {
      console.error("desculpe, topico '" + topico + "' não está pronto, falha ao enviar a mensagem ao Kafka.");
  }
}

function finalizarProcessamento(data, res){
  if (topicoOnline){
    try {
      sendMessageKafka(topico, data);
      res.status(200).send(data);
    } catch (err) {
      console.error(err);
      res.status(500).send({result: "fail"});
    }
  }
  else {
    res.status(500).send({result: "fail - serviço kafka não está online"});
  }
  return res.redirect('/');
}

function processarVagas(callback, res){
  var data = { "from": "hc",
            "to": "cross",
            "content":{
              "hospital":{
                "identificador": 3,
                "nome": "HC",
                "location": {
                    "lat": -23.198176,
                    "lng": -45.915881
                },
                "leitos": leito["leitos"],
                "especialistas": especialista,
                "plantonistas": plantonista
              }
            }
          };
  callback(data, res);
  return res.redirect('/');
}

// Retorno
function retornoRecuperarPlantonistas(body, res){
  plantonista = JSON.parse(body);
    if (especialista && leito)
      processarVagas(finalizarProcessamento, res);
  return res.redirect('/');
}

function retornoRecuperarEspecialistas(body, res){
  especialista = JSON.parse(body);
  if (plantonista && leito)
    processarVagas(finalizarProcessamento, res);
  return res.redirect('/');
}

function retornoRecuperarLeitos(body, res){
  leito = JSON.parse(body);
  if (plantonista && especialista)  
    processarVagas(finalizarProcessamento, res);
  return res.redirect('/');
}

// Chamadas Principais
function RecuperarPlantonistas(callback, res){
  var url = "https://pbl2018-hospital-plantonista.herokuapp.com/plantonista";
  request.get(url, (error, response, body) => {
    callback(body, res);
  });
  return res.redirect('/');
}

function RecuperarEspecialistas(callback, res){
  var url = "https://stagihobd-ts01.herokuapp.com/api/especialistas/disponivel"
  request.get(url, (error, response, body) => {
      callback(body, res);
  });
  return res.redirect('/');
}

function RecuperarLeitos(callback, res){
  var url = "https://stagihobd-ts02.herokuapp.com/leitos?hospital=hc&status=livre"
  request.get(url, (error, response, body) => {
      callback(body, res);
    });
    return res.redirect('/');
}

// VAGA = leito + especialista + plantonista
router.get('/vagas', function(req, res) {
    RecuperarPlantonistas(retornoRecuperarPlantonistas, res);
    RecuperarEspecialistas(retornoRecuperarEspecialistas, res);
    RecuperarLeitos(retornoRecuperarLeitos, res);
    return res.redirect('/');
});

module.exports = router;