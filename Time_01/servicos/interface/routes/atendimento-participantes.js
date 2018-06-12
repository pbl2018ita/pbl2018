var express = require('express');
var request = require('request');
var router  = express.Router();

var wwDominio = 'http://w.blockchain.wgetdev.tech:3000/'

//TODO: Refatorar o Kafka em Serviço

/* --[ KAFKA ]-- */
var kafka = require('kafka-node')
var Producer = kafka.Producer
var client = new kafka.Client("stagihobd.hashtagsource.com:2181")
var producer = new Producer(client);

var topico = "atendimento-hospital";
var topicoOnline = false ;

// Configurando o Kafka
producer.on('ready', function () {
  console.log("Producer para VAGA está pronto, no tópico 'cross'");
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
      console.error("desculpe, topico 'cross' não está pronto, falha ao enviar a mensagem ao Kafka.");
  }
}
/* --[ KAFKA - fim ]-- */

function retornarStatus(res, statusCode, infos, erro){
  if (statusCode == 200 || statusCode == 201)
    res.status(200).send({ result: "Operacao Efetuada com Sucesso " + JSON.stringify(infos)});

  if (statusCode == 500)
      res.status(500).send({ result: "Erro ao tentar realizar a Operacao\n:" +  + JSON.stringify(infos) + " \n: " + erro});
}

// API para cadastrar hospital
router.post('/atendimento-hospital', function(req, res) {
  var dados = {
    "$class": "stagihobd.atendimento.HospitalParticipant", 
    "hospitalID": req.body.hospitalID,
    "nome": req.body.nome,
    "cnpj": req.body.cnpj,
    "endereco": req.body.endereco,
    "numero": req.body.numero,
    "cep": req.body.cep,
    "bairro": req.body.bairro,
    "municipio": req.body.municipio, 
    "uf": req.body.uf
  };
  var options = {
    uri   : wwDominio+'/api/stagihobd.atendimento.HospitalParticipant',
    method: 'POST',
    json  :  dados
  };

  request(options, (error, response, body) => {
    if (!error && response.statusCode == 200)
      sendMessageKafka(topico, JSON.stringify(options));
    retornarStatus(res, response.statusCode, options, error);
  });
});

// API para buscar hospital
router.get('/atendimento-hospital/:id', function(req, res) {
    var url = wwDominio+'/api/stagihobd.atendimento.HospitalParticipant/'+req.params.id
    request.get(url, (error, response, body) => {
        retornarStatus(res, response.statusCode, url, error);
      });
});

function medicoPOST(res, dados, url){
    var options = {
        uri   : wwDominio+url,
        method: 'POST',
        json  :  dados
    };

    request(options, (error, response, body) => {
        if (!error && response.statusCode == 200)
        sendMessageKafka(topico, JSON.stringify(options));
        retornarStatus(res, response.statusCode, options, error);
    });
}

// API para cadastrar médicos
router.post('/atendimento-medico', function(req, res) {
    var dados = {
      "$class": "stagihobd.atendimento.MedicoParticipant", 
      "crm": req.body.crm,
      "nome": req.body.nome
    };
    medicoPOST(res, dados, '/api/stagihobd.atendimento.MedicoParticipant');
});
  
// API para cadastrar especialistas
router.post('/atendimento-especialista', function(req, res) {
    var dados = {
      "$class": "stagihobd.atendimento.MedicoEspecialistaParticipant", 
      "crm": req.body.crm,
      "nome": req.body.nome,
      "especialidade": req.body.especialidade
    };
    medicoPOST(res, dados, '/api/stagihobd.atendimento.MedicoEspecialistaParticipant');
});
  
// API para buscar médicos
router.get('/atendimento-medico/:id', function(req, res) {
    var url = wwDominio+'/api/stagihobd.atendimento.MedicoParticipant/'+req.params.id
    request.get(url, (error, response, body) => {
        retornarStatus(res, response.statusCode, url, error);
      });
});
  
// API para buscar especialistas
router.get('/atendimento-especialista/:id', function(req, res) {
    var url = wwDominio+'/api/stagihobd.atendimento.MedicoEspecialistaParticipant/'+req.params.id
    request.get(url, (error, response, body) => {
        retornarStatus(res, response.statusCode, url, error);
      });
});