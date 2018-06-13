var express = require('express');
var request = require('request');
var router  = express.Router();

var wwDominio = 'http://w.blockchain.wgetdev.tech:3000' //'http://18.231.181.57:3000'

// função para realizar o retorno dos micro-servicos
function retornarStatus(res, statusCode, infos, erro){
  if (statusCode == 200 || statusCode == 201)
    res.status(200).send({result:"Operação realizada com sucesso", retorno: infos});
  
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
      retornarStatus(res, response.statusCode, body, '');
    else
      retornarStatus(res, response.statusCode, options, error);
  })
});

// API para buscar hospital
router.get('/atendimento-hospital/:id', function(req, res) {
    var url = wwDominio+'/api/stagihobd.atendimento.HospitalParticipant/'+req.params.id
    request.get(url, (error, response, body) =>{
      retornarStatus(res, response.statusCode, body, error);
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
        retornarStatus(res, response.statusCode, body, error);
      else
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
      retornarStatus(res, response.statusCode, body, error);
    });
});
  
// API para buscar especialistas
router.get('/atendimento-especialista/:id', function(req, res) {
    var url = wwDominio+'/api/stagihobd.atendimento.MedicoEspecialistaParticipant/'+req.params.id
    request.get(url, (error, response, body) => {
      retornarStatus(res, response.statusCode, body, error);
    });
});

module.exports = router;