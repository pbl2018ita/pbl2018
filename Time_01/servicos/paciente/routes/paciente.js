var express = require('express');
var router  = express.Router();
var mysql   = require('mysql');

var connection;
var pacienteData;
var ctrl;

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express Paciente' });
});

router.get('/paciente', function(req, res, next) {
  res.render('index', { title: 'Express Paciente' });
});

//Retorna o hash do Cliente
function finalizar(hashBlochChain, res, st){
  var literal = ((st == 200) ? "result" : "erro");
  var msg = {
     literal: hashBlochChain
  };
  msg = JSON.parse(JSON.stringify(msg).replace('literal',literal));
  res.status(st).send(msg);
}

//Cadastra o Cliente, no BC, quando não encontrado
function cadastrarPaciente(callback, obj, res){
  // TODO: Implementar a comunicação com o Serviço do BlockChain, quando estiver pronto
  console.log("TODO: Implementar o cadastro paciente no BlockChain");

  var id = Math.round(Math.random() * (9 - 0));
  var hashBlochChainMock = [
    "BD5943F620B00FDCB67088D884313CFCF5AFEDC336B97E88BB1EAD9AE748DD99",
    "0A2EE86E3FD11F54115957CCD03B9E4D2009409717449C10EA138A549D590D60",
    "696BB81019567598AFE3AE7EEF75660F292BE08AC39739E96C4FAB3E4367B064",
    "92F30ED626D3256CDEC0F47F0B6F23B661F2224A50FE42140EE6BF1FED3FD56A",
    "51F1EF0D77133098A9E6524A8F6323CA4948C9199ED25C557F2A45A8EAC99BBB",
    "203006FB3B0B26126A45C2647A3BD6ECD4F11BD32C96ECC76742E58AD4F6D153",
    "3087CF1A0238407088D1D20170AFA8E19487EAE4375BB5479236C87F3E31E71D",
    "71958E05D79E8F1EB28F93F25D341200A81365485EAEE09E2F1E0ED9D6277FDE",
    "BD5943F620B00FDCB67088D884313CFCF5AFEDC336B97E88BB1EAD9AE748DD99",
    "4850C415D7F66EB4434CC0288638E2823D9677BB82B683D77712E1A829D51503"
  ];
  
  finalizar(hashBlochChainMock[id], res, 200)
}


function ConsultarDataBaseEvent(err, identificadorBlockChain, obj, res, callback){
  if (err){
    callback(err, res, 500);
  }

  if (identificadorBlockChain)
    callback(identificadorBlockChain, res, 200);
  else
    cadastrarPaciente(callback, obj, res);
}

function ConsultarDataBase(querySQL, callback, obj, res, callbackOriginal){
  connection = mysql.createConnection({
    host     : 'stagihobd.hashtagsource.com',
    database : 'time1',
    port     : '3306',
    user     : 'root',
    password : 'nai6eo3yahNaip3shoh3g'
  });
  connection.connect();
  connection.query(querySQL, function(err, rows, fields) {
    if (err)
      callbackOriginal(err, res, 500);
    else if (rows){
      try{
        var hashBC = ((JSON.parse(JSON.stringify(rows))[0].hashBC) ? 
                          (JSON.parse(JSON.stringify(rows))[0].hashBC) 
                          : (JSON.parse(JSON.stringify(rows))[0][0].hashBC));
        callback(null, hashBC, obj, res, callbackOriginal);
      }
      catch(erro){
        callback(null,null, obj, res, callbackOriginal);
      }
    }
    else
      callback(null,null, obj, res, callbackOriginal);
  });
  connection.end();
}

function BuscarHash(callback, campo, valor, obj, res){
  //var querySQL = querySQL = 'SELECT hashBC AS hashBC FROM PACIENTE WHERE ' + campo + '= "' + valor + '" ;';
  var querySQL = 'call sp_LocalizarPaciente("' + campo + '", "' + valor + '");';
  ConsultarDataBase(querySQL, ConsultarDataBaseEvent, obj, res, callback);
}

router.post('/paciente', function(req, res) {
  pacienteData = {
      "nome"      : req.body.nome,
      "cpf"       : req.body.cpf,
      "rg"        : req.body.rg,
      "telefone"  : req.body.telefone,
      "sus"       : req.body.sus,
      "hashBC"    : req.body.hashBC,
      "obj"       : req.body
  };
  
  if (pacienteData){
    ctrl = 0

    if (pacienteData.cpf && ctrl == 0){
      ctrl = 1
      BuscarHash(finalizar, "cpf", pacienteData.cpf, pacienteData.obj, res);
    }

    if (pacienteData.rg && ctrl == 0){
      ctrl = 1
      BuscarHash(finalizar, "rg", pacienteData.rg, pacienteData.obj, res);
    }
    
    if (pacienteData.telefone && ctrl == 0){
      ctrl = 1
      BuscarHash(finalizar, "telefone", pacienteData.telefone, pacienteData.obj, res);
    }
  
    if (pacienteData.sus && ctrl == 0){
      ctrl = 1
      BuscarHash(finalizar, "sus", pacienteData.sus, pacienteData.obj, res);
    }

    if (pacienteData.nome && ctrl == 0){
      ctrl = 1
      BuscarHash(finalizar, "nome", pacienteData.nome, pacienteData.obj, res);
    }

  }
  else{
    res.status(500).send({"result": "As informações do paciente não foram enviadas, não foi possível processar a solicitação."});
  }

});

module.exports = router;
