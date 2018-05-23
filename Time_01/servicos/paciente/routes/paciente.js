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
  var hashBlochChain = "46070d4bf934fb0d4b06d9e2c46e346944e322444900a435d7d9a95e6d7435f5"
  validarRetorno(hashBlochChain, res)
}

function BuscarHash(callback, campo, valor, obj, res){

  var querySQL = 'SELECT hashBC AS hashBC FROM PACIENTE WHERE ' + campo + '= "' + valor + '" ;';
  var hashBlochChain;
  
  console.log(querySQL);

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
        hashBlochChain = rows[0].hashBC;
        console.log('O Hash do paciente é: ', hashBlochChain);
      }
    }
    catch(erro){
      hashBlochChain = null;
    }
    
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
