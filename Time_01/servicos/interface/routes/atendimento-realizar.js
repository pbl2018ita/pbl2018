var express = require('express');
var request = require('request');
var router  = express.Router();

var wwDominio = 'http://w.blockchain.wgetdev.tech:3000'

function retornarStatus(res, statusCode, infos, erro){
  if (statusCode == 200 || statusCode == 201)
    res.status(200).send({ result: "Operacao Efetuada com Sucesso " + JSON.stringify(infos)});

  if (statusCode == 500)
      res.status(500).send({ result: "Erro ao tentar realizar a Operacao\n:" +  + JSON.stringify(infos) + " \n: " + erro});
}

function RealizarAtendimentoAsset(req, res, tipoOperacao){
    var dados = {
        "$class": "stagihobd.atendimento.AtendimentoAsset",
        "atendimentoID": req.body.atendimentoID,
        "dono": "resource:stagihobd.atendimento.MedicoParticipant#"+req.body.crm,
        "status": req.body.status
    };

  var url = wwDominio+'/api/stagihobd.atendimento.AtendimentoAsset';
  var metodo = "POST";

  if (tipoOperacao != "novo"){
    url = wwDominio+'/api/stagihobd.atendimento.AtendimentoAsset/' + req.body.autorizacaoID;
    metodo = 'PUT';
  }
    
    var options = {
        uri   : url,
        method: metodo,
        json  :  dados
    };

    request(options, (error, response, body) => {
        if (response.statusCode == 200 || response.statusCode == 201)
          RealizarAtendimentoTransaction(req, res);
        else
          retornarStatus(res, response.statusCode, options, error);
    });
}

function RealizarAtendimentoTransaction(req, res){
    var dados = {
        "$class": "stagihobd.atendimento.AtenderTransaction",
        "asset": "resource:stagihobd.atendimento.AtendimentoAsset#"+req.body.atendimentoID,
        "autorizacaoID": req.body.autorizacaoID,
        "pacienteID":req.body.pacienteID,
        "status": req.body.status
    };
    
    var options = {
        uri   : wwDominio+'/api/stagihobd.atendimento.AtenderTransaction',
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

// API para realizar o atendimento (Asset + Transaction)
router.post('/atendimento-realizar', function(req, res) {
    var tipoOperacao = (req.body.atendimentoID != null && req.body.status != "AUTORIZADO") ? "atualizacao" : "novo";
    RealizarAtendimentoAsset(req, res, tipoOperacao);
});

// API para buscar o atendimento
router.get('/atendimento-realizar/:id', function(req, res) {
    var url = wwDominio+'/api/stagihobd.atendimento.AtendimentoAsset/'+req.params.id
    request.get(url, (error, response, body) => {
      if (response.statusCode == 200)
        retornarStatus(res, response.statusCode, body, error);
      else
        retornarStatus(res, 500, '', 'Atendimento: ' + req.params.id + ' não encontrado');
      });
  });  

module.exports = router;