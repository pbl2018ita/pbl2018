'use strict'

var mongoose = require('mongoose')
var Reserva = mongoose.model('Reserva')
var Leitos = mongoose.model('Leitos')
const async = require('async');
var request = require('request');
var leitos_disponiveis;
var reserva;

function getLeitos(callback) {
  Leitos.find({}, function(err, leitos) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, leitos);
    }
  });
};

getLeitos(function(err, leitos) {
    if (err) {
        console.log(err);
    }
   leitos_disponiveis = leitos
});

function getReserva(callback) {
  Reserva.find({}, function(err, reservas) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, reservas);
    }
  });
};

getReserva(function(err, reservas) {
    if (err) {
        console.log(err);
    }
   reserva = reservas;

});


function httpGet(url, callback) {
  const options = {
    url :  url,
    json : true
  };
  request(options,
    function(err, res, body) {
      callback(err, body);
    }
  );
}


exports.getReservaView = function (req, res) {
  var obj = {}
  obj['reserva'] = reserva
  res.render('reserva.ejs', {result: obj})
}


exports.getLeitosView = function (req, res) {
  var obj = {}

  if (req.query.filterOption) {
    obj['leitos'] = leitos_disponiveis.filter( x => {
      return x.setor == req.query.filterOption;
    })
  } else {
    obj['leitos'] = leitos_disponiveis
  }
  res.render('index.ejs', {result: obj})
}


exports.getEspecialistaView = function (req, res) {
  var obj = {}
  try {  
    var url = ['https://stagihobd-ts01.herokuapp.com/api/especialistas']
    async.map(url, httpGet, function (err, data){
      if (err) return console.log(err);
      obj['especialista'] = data[0];
      res.render('especialista.ejs', {result: obj})
    });
  } catch(err) {
    console.log(err)
    res.send('Ocorreu um erro')
  }
}


exports.getPlantonistaView = function (req, res) {
  var obj = {}
  try {  
    var url = ['https://pbl2018-hospital-plantonista.herokuapp.com/api/plantonista']
    async.map(url, httpGet, function (err, data){
      if (err) return console.log(err);
      console.log(data[0])
      obj['plantonista'] = data[0];
      res.render('plantonista.ejs', {result: obj})
    });
  } catch(err) {
    console.log(err)
    res.send('Ocorreu um erro')
  }
}


exports.getPacienteView = function (req, res) {
  var obj = {}
  try {  
    var url = ['http://34.220.241.225:3000/api/stagihobd.paciente.Paciente']
    async.map(url, httpGet, function (err, data){
      if (err) return console.log(err);
      console.log(data[0])
      res.render('paciente.ejs', {result: data[0]})
    });
  } catch(err) {
    console.log(err)
    res.send('Ocorreu um erro')
  }
}


exports.postPaciente = function (req, res) {
  var obj = {}
  var pacienteId = Math.floor(Math.random() * 5000)
  try { 

    var url_participant = "http://34.220.241.225:3000/api/stagihobd.paciente.Paciente";

    var url_assent = "http://34.220.241.225:3000/api/stagihobd.paciente.CadastroPaciente"
      

    var url_transaction  = "http://34.220.241.225:3000/api/stagihobd.paciente.Habilitar_Desabilitar_Cadastro"

    var participant = {
       "$class": "stagihobd.paciente.Paciente",
       "pacienteId": pacienteId.toString(),
       "nome": req.body.nome,
       "sobrenome": req.body.sobrenome,
       "cartao_sus": req.body.cartao_sus,
       "numero_prontuario": req.body.numero_prontuario,
       "cpf": req.body.cpf,
       "rg": req.body.rg,
       "orgao_expedidor": req.body.orgao_expedidor,
       "data_expedicao": req.body.data_expedicao,
       "data_nascimento": req.body.data_nascimento,
       "nome_da_mae": req.body.nome_da_mae,
       "nome_do_pai": req.body.nome_do_pai,
       "telefone_residencial": req.body.telefone_residencial,
       "telefone_celular": req.body.telefone_celular,
       "telefone_trabalho": req.body.telefone_trabalho,
       "email": req.body.email,
       "municipio_residencia": req.body.municipio_residencia,
       "uf": req.body.uf,
       "tipo_de_logradouro": "rua",
       "nome_logradouro": req.body.nome_logradouro,
       "numero": req.body.numero,
       "complemento": req.body.complemento,
       "bairro": req.body.bairro,
       "cep": req.body.cep,
       "observacao_1": req.body.observacao_1,
       "observacao_2": req.body.observacao_1,
       "observacao_3": req.body.observacao_1
     }

     var assent = {
          "$class": "stagihobd.paciente.CadastroPaciente",
          "cadastroId": pacienteId.toString(),
          "owner": "resource:stagihobd.paciente.Paciente#"+pacienteId.toString(),
          "value": "Habilitado"
      }

      var transaction =  {
        "$class": "stagihobd.paciente.Habilitar_Desabilitar_Cadastro",
        "asset": "resource:stagihobd.paciente.CadastroPaciente#"+pacienteId.toString(),
        "newValue": "Habilitado"
      }


     
     request.post({
        headers: {'content-type' : 'application/json'},
        url:     url_participant,
        json: true,
        body: participant
      }, function(error, response, body){

        console.log('passou aqui 1')
        if(response.statusCode == 200){
            request.post({
            headers: {'content-type' : 'application/json'},
            url:     url_assent,
            json: true,
            body: assent
            }, function(error, response, body){
              console.log('passou aqui 2')
              if(response.statusCode == 200){
                  request.post({
                  headers: {'content-type' : 'application/json'},
                  url:     url_transaction,
                  json: true,
                  body: transaction
                  }, function(error, response, body){
                    console.log('passou aqui 3')
                    if(response.statusCode == 200){
                      console.log(body);
                      res.render('paciente.ejs', {result: body.transactionId})
                    }
                  })
              }
            })
        }
        })
  } catch(err) {
    console.log(err)
    res.send('Ocorreu um erro')
  }
}





/*

-- busca pelo CPF
curl -X POST -H "Content-Type: application/json" -d '{"cpf":"333.333.333-33"}' https://pbl2018-paciente.herokuapp.com/api/paciente

-- busca pelo RG
curl -X POST -H "Content-Type: application/json" -d '{"rg":"33.333.333-3"}' https://pbl2018-paciente.herokuapp.com/api/paciente

-- busca pelo TELEFONE
curl -X POST -H "Content-Type: application/json" -d '{"telefone":"+33 33 33333-3333"}' https://pbl2018-paciente.herokuapp.com/api/paciente

-- busca pelo código SUS
curl -X POST -H "Content-Type: application/json" -d '{"sus":"33333333333 3333"}' https://pbl2018-paciente.herokuapp.com/api/paciente

-- busca pelo NOME
curl -X POST -H "Content-Type: application/json" -d '{"nome":"PACIENTE 3"}' https://pbl2018-paciente.herokuapp.com/api/paciente



*/