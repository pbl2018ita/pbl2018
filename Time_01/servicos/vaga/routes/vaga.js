var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var router = express.Router();

var urlBase = "http://localhost:9000/api";

var vagas;
var especialista;
var plantonista;

router.get('/', function(req, res, next) {
  res.render('index', { title: 'VAGA | Express' });
});

function ProcessarPlantonista(callback, res){
  // var url = "http://localhost:9001/api/plantonista";
  // https://pbl2018-hospital-plantonista.herokuapp.com
  //urlBase + "/plantonistas"

  var url = "https://pbl2018-hospital-plantonista.herokuapp.com/api/plantonista";

  request.get(url, (error, response, body) => {
    var plantonista = JSON.parse(body);
    callback(body, res);
  });
}

function retornoProcessar(body, res){

  vagas = JSON.parse(body)["hospital"]["leitos"]
  vagas = { "from": "hc",
            "to": "cross",
            "content":{
              "hospital":{
                  "identificador": "123456",
                  "nome": "hc",
                  "leitos": vagas
                }
            }
        };

  if (especialista)
    ProcessarPlantonista(retornoProcessarPlantonista, res);
}

function retornoProcessarEspecialista(body, res){
  especialista = JSON.parse(body);

  if (vagas)
    ProcessarPlantonista(retornoProcessarPlantonista, res);
}

function ProcessarEspecialista(callback, res){

  // var url = urlBase + "/especialistas"
  // var url = "http://localhost:9002/api/especialistas/disponivel";

  // TODO: criar uma nova aplicação
  // var url = https://pbl2018-hospital-especialista.herokuapp.com

  var url = "https://stagihobd-ts01.herokuapp.com/api/especialistas/disponivel"

  request.get(url, (error, response, body) => {
      // var especialista = JSON.parse(body);
      callback(body, res);
  });
}

function Processar(callback, res){
  var url = "https://stagihobd-ts02.herokuapp.com/leitos?hospital=hc&status=livre"
  // TODO: Descobrir pq dá erro quando executado local
  // var url = "http://localhost:9003/leito";

  // TODO: Publicar uma nova aplicação
  // var url = "https://stagihobd-hospital-leito.herokuapp.com";

  request.get(url, (error, response, body) => {
      /*
        console.log("\n\n\n\n[Processar()]\n\n\n");
        console.log(body);
        console.log("\n\n\n\n");
      */
      callback(body, res);
    });
}

function processarVagas(){

  for (p in plantonista){
    for (e in especialista){

      if (plantonista[p].crm != especialista[e]._id)
        return

      vagas["content"]["hospital"]["plantonista"] = especialista[e];
      return vagas;
    }
  }

}

function retornoProcessarPlantonista(body, res){
  plantonista = JSON.parse(body);
  res.json(processarVagas());
}

// VAGA = leito + especialista + plantonista
router.get('/vagas', function(req, res) {
    Processar(retornoProcessar, res);
    ProcessarEspecialista(retornoProcessarEspecialista, res);
});

// VAGA = leito + especialista + plantonista
router.get('/vagas', function(req, res) {
    Processar(retornoProcessar, res);
    ProcessarEspecialista(retornoProcessarEspecialista, res);
});

module.exports = router;
