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

function RealizarProntuarioAsset(req, res, tipoOperacao){
    var dados = {
        "$class": "stagihobd.atendimento.ProntuarioAsset",
        "atendimentoID": req.body.atendimentoID,
        "dono": "resource:stagihobd.atendimento.MedicoParticipant#"+req.body.crm,
        "status": req.body.status
    };
 
    var url = wwDominio+'/api/stagihobd.atendimento.ProntuarioAsset';
    var metodo = "POST";

    if (tipoOperacao != "novo"){
      url = wwDominio+'/api/stagihobd.atendimento.ProntuarioAsset/' + req.body.prontuarioID;
      metodo = 'PUT';
    }

    var options = {
        uri   : url,
        method: metodo,
        json  :  dados
    };

    request(options, (error, response, body) => {
        if (response.statusCode == 200)
            RealizarProntuarioTransaction(req, res);
        else
          retornarStatus(res, response.statusCode, options, error);
    });
}

function RealizarProntuarioTransaction(req, res){
    var dados = {
        "$class": "stagihobd.atendimento.RegistrarProntuarioTransaction",
        "asset": "resource:stagihobd.atendimento.ProntuarioAsset#"+req.body.prontuarioID,
        "prontuarioID": req.body.prontuarioID,
        "atendimentoID": req.body.atendimentoID,
        "autorizacaoID": req.body.autorizacaoID,
        "pacienteID": req.body.pacienteID,
        "status": req.body.status,
        "registroClinico": req.body.registroClinico,
        "dadosColetados": req.body.dadosColetados,
        "avaliacao": req.body.avaliacao,
        "plano": req.body.plano,
        "dataAtendimento": req.body.dataAtendimento
    };
    
    var options = {
        uri   : wwDominio+'/api/stagihobd.atendimento.RegistrarProntuarioTransaction',
        method: 'POST',
        json  :  dados
    };
    
    request(options, (error, response, body) => {
        if (response.statusCode == 200 || response.statusCode == 201)
          retornarStatus(res, response.statusCode, options, error);
        else
          retornarStatus(res, response.statusCode, options, error);
    });    
}

// API para realizar o cadastro do prontuário (Asset + Transaction)
router.post('/atendimento-prontuario', function(req, res) {
    var tipoOperacao = (req.body.prontuarioID != null && req.body.status != "AUTORIZADO") ? "atualizacao" : "novo";
    RealizarProntuarioAsset(req, res, tipoOperacao);
});

// API para buscar o prontuário
router.get('/atendimento-prontuario/:id', function(req, res) {
    var url = wwDominio+'/api/stagihobd.atendimento.AtendimentoAsset/'+req.params.id
    request.get(url, (error, response, body) => {
        if (response.statusCode == 200)
          retornarStatus(res, response.statusCode, url, error);
        else
          retornarStatus(res, 500, '', 'Atendimento: ' + req.params.id + ' não encontrado');
        });
      });
  });  

  module.exports = router;