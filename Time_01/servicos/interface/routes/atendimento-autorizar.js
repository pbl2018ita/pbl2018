var express = require('express');
var request = require('request');
var router  = express.Router();

var wwDominio = 'http://w.blockchain.wgetdev.tech:3000'

function retornarStatus(res, statusCode, infos, erro){
  if (statusCode == 200 || statusCode == 201)
    res.status(200).send({ result: "Operacao Efetuada com Sucesso ", retorno: infos});

  if (statusCode == 500)
      res.status(500).send({ result: "Erro ao tentar realizar a Operacao\n:" +  + JSON.stringify(infos) + " \n: " + erro});
}

function AutorizarAtendimentoAsset(req, res, tipoOperacao){
  var dados = {
    "$class": "stagihobd.atendimento.AutorizacaoAsset",
    "autorizacaoID": req.body.autorizacaoID,
    "dono": "resource:stagihobd.atendimento.HospitalParticipant#"+req.body.hospitalID,
    "status": req.body.status
  };

  var url = wwDominio+'/api/stagihobd.atendimento.AutorizacaoAsset';
  var metodo = "POST";

  if (tipoOperacao != "novo"){
    url = wwDominio+'/api/stagihobd.atendimento.AutorizacaoAsset/' + req.body.autorizacaoID;
    metodo = 'PUT';
  }

  var options = {
    uri   : url,
    method: metodo,
    json  : dados
  };

  request(options, (error, response, body) => {
    if (response.statusCode == 200 || response.statusCode == 201)
      AutorizarAtendimentoTransaction(req, res);
    else
      retornarStatus(res, response.statusCode, options, error);
  });
}

function AutorizarAtendimentoTransaction(req, res){

  var dados = {
    "$class": "stagihobd.atendimento.AutorizarTransaction",
    "asset": "resource:stagihobd.atendimento.AutorizacaoAsset#"+req.body.autorizacaoID,
    "pacienteID": req.body.pacienteID,
    "status": req.body.status
  };

  var options = {
    uri   : wwDominio+'/api/stagihobd.atendimento.AutorizarTransaction',
    method: 'POST',
    json  :  dados
  };

  request(options, (error, response, body) => {
    if (response.statusCode == 200)
      retornarStatus(res, response.statusCode, body, error);
    else
      retornarStatus(res, response.statusCode, options, error);
  });
}

// API para realizar uma transacao de autorizacao
router.post('/atendimento-hospital-autorizacao', function(req, res) {

  var tipoOperacao = (req.body.autorizacaoID != null && req.body.status != "AUTORIZADO") ? "atualizacao" : "novo";
  AutorizarAtendimentoAsset(req, res, tipoOperacao);

});

// API para buscar autorizacao
router.get('/atendimento-hospital-autorizacao/:id', function(req, res) {
  var url = wwDominio+'/api/stagihobd.atendimento.AutorizacaoAsset/'+req.params.id
  var statusCode = 200;
    request.get(url, (error, response, body) => {
      if (response.statusCode == 200)
        retornarStatus(res, response.statusCode, body, error);
      else
        retornarStatus(res, 500, '', 'Autorização: ' + req.params.id + ' não encontrada');
    });
});

module.exports = router;