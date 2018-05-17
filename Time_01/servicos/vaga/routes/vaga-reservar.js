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

var reservaData;

var ctrlLeito = 0;
var ctrlEspecialista = 0;
var ctrlPlantonista = 0;

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


function retornarStatus(res, statusCode){

  console.log("[ok] - retornarStatus -> statusCode: "+statusCode);

  if (statusCode == 200 || statusCode == 201)
    res.status(200).send({ result: "Reserva Efetuada com Sucesso"});

  if (statusCode == 500)
      res.status(500).send({ result: "Erro ao tentar realizar a Reserva"});

}

function ProcessarReservaLeito(res, dados){

  var options = {
    uri   : 'https://stagihobd-test-ts02.herokuapp.com/leito/reserva',
    method: 'POST',
    json  :  dados
  };

  ctrlLeito = 0;

  request(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      sendMessageKafka(topico, JSON.stringify(options));
      console.log("[ok] - ProcessarReservaLeito");
      ctrlLeito = 1;
    }

    if (ctrlEspecialista == 1 && ctrlPlantonista == 1)
      retornarStatus(res, response.statusCode);
  });
}

function ProcessarReservaPlantonista(res, dados){
  //TODO: Informar a URI correta de PLANTONISTA (US-299c)
  var options = {
    uri   : 'https://pbl2018-hospital-plantonista.herokuapp.com/plantonista-reserva',
    method: 'POST',
    json  :  dados
  };

  ctrlPlantonista = 0;

  request(options, (error, response, body) => {
    if (!error && (response.statusCode == 200 || response.statusCode == 201)) {
      sendMessageKafka(topico, JSON.stringify(options));
      console.log("[ok] - ProcessarReservaPlantonista");
      ctrlPlantonista = 1;
    }

    if (ctrlEspecialista == 1 && ctrlLeito == 1)
      retornarStatus(res, response.statusCode);
  });
};

function ProcessarReservaEspecialista(res, dados){

  ctrlEspecialista = 1;
  if (ctrlPlantonista == 1 && ctrlLeito == 1)
    retornarStatus(res, 200);

  /*
  //TODO: Informar a URI correta de ESPECIALISTA (US-203)
  // Ao ser criado o microserviço, precisamos apenas informar a URI e descomentar

  var options = {
    uri   : 'https://stagihobd-test-ts02.herokuapp.com/leito/reserva',
    method: 'POST',
    json  :  dados
  };

  ctrlEspecialista = 0;

  request(options, (error, response, body) => {
    if (!error && response.statusCode == 200) {
      sendMessageKafka(topico, JSON.stringify(options));
      console.log("[ok] - ProcessarReservaEspecialista");
      ctrlEspecialista = 1;
    }

    if (ctrlPlantonista == 1 && ctrlLeito == 1)
      retornarStatus(res, response.statusCode);
  });*/
};

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
router.post('/vagas-reservar', function(req, res) {
  reservaData = {
      "crm"             : req.body.crm,
      "status"          : req.body.status,
      "id_reserva"      : req.body.id_reserva,
      "id_leito"        : req.body.id_leito,
      "id_paciente"     : req.body.id_paciente,
      "id_plantonista"  : req.body.id_plantonista,
      "id_especialista" : req.body.id_especialista,
      "data_internacao" : req.body.data_internacao
  };
  ProcessarReservaLeito(res, reservaData);
  ProcessarReservaPlantonista(res, reservaData);

  // TODO: Implementar o backend de Especialista, que na US203 foi acessado diretamente o DB
  ProcessarReservaEspecialista(res, reservaData);
});

module.exports = router;
