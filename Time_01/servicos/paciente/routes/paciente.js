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
function validarRetorno(hashBlochChain, res){

  res.status(200).send({"result": hashBlochChain});
}

//Cadastra o Cliente, no BC, quando não encontrado
function cadastrarPaciente(callback, obj, res){

  console.log("TODO: Implementar o cadastro paciente no BlockChain");
  // TODO: Implementar a comunicação com o Serviço do BlockChain, quando estiver pronto
  
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

  validarRetorno(hashBlochChainMock[Math.random() * (9 - 0)], res)
}

function BuscarHash(callback, campo, valor, obj, res){

  // var querySQL = 'SELECT hashBC AS hashBC FROM PACIENTE WHERE ' + campo + '= "' + valor + '" ;';

  var querySQL = 'call sp_LocalizarPaciente("' + campo + '", "' + valor + '");';
  var hashBlochChain;
  
  //Conectar no banco de dados
  connection = mysql.createConnection({
    host     : 'stagihobd.hashtagsource.com',
    database : 'time1',
    port     : '3306',
    user     : 'root',
    password : 'nai6eo3yahNaip3shoh3g'
  });
  connection.connect();
  connection.query(querySQL, function(err, rows, fields) {
    if (err) {
      throw err;
    }
    try{
      if (rows){
        hashBlochChain = (rows[0][0].hashBC) ? rows[0][0].hashBC: rows[0].hashBC;
         // rows[0][0].hashBC -> é o retornoo se for utiizada PROCEDURE
         // rows[0].hashBC    -> se for utiizada SELECT hard code
      }
    }
    catch(erro){
      hashBlochChain = null;
    }
    console.log('O Hash do paciente é: ', hashBlochChain);
  });
  connection.end();

  if (hashBlochChain){
    callback(hashBlochChain, res);
  }
  else{
    cadastrarPaciente(callback, obj, res);
  }
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
      BuscarHash(validarRetorno, "cpf", pacienteData.cpf, pacienteData.obj, res);
    }

    if (pacienteData.rg && ctrl == 0){
      ctrl = 1
      BuscarHash(validarRetorno, "rg", pacienteData.rg, pacienteData.obj, res);
    }
    
    if (pacienteData.telefone && ctrl == 0){
      ctrl = 1
      BuscarHash(validarRetorno, "telefone", pacienteData.telefone, pacienteData.obj, res);
    }
  
    if (pacienteData.sus && ctrl == 0){
      ctrl = 1
      BuscarHash(validarRetorno, "sus", pacienteData.sus, pacienteData.obj, res);
    }

    if (pacienteData.nome && ctrl == 0){
      ctrl = 1
      BuscarHash(validarRetorno, "nome", pacienteData.nome, pacienteData.obj, res);
    }

  }
  else{
    res.status(500).send({"result": "As informações do paciente não foram enviadas, não foi possível processar a solicitação."});
  }

});

module.exports = router;
