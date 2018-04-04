// fazendo as referencias para rodar a aplicacao

var express = require('express');
var bodyParser = require('body-parser');

// configurando a aplicacao

var app = express();
var port = process.env.PORT || 9000;
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// criando um array para criar dados com lista de plantonistas
var plantonistas = [
  { id: 1, nome: 'Jean Carlos', crm: 123456, hospital: 'hospital 1' },
  { id: 2, nome: 'José', crm: 222222, hospital: 'hospital 2'},
  { id: 3, nome: 'Wilson', crm: 333333, hospital: 'hospital 1'},
  { id: 4, nome: 'Thales', crm: 444444, hospital: 'hospital 2'},
  { id: 5, nome: 'Guilherme', crm: 555555, hospital: 'hospital 1'}
];

// gerando um evento sempre que o servico for acionado
router.use(function(request, response, next) {
  console.log('O serviço foi acionado ');
  next();
});


router.get('/', function(request, response) {
  response.json({ message: 'Está rodando em /' });
});

// configurando as rotas
var plantonistasRoute = router.route('/plantonista');
var plantonistaRoute = router.route('/plantonista/:id');
var editplantonistaRoute = router.route('/plantonista/:id/edit');

// listando todos os plantonistas existentes
plantonistasRoute.get(function(request, response) {
  response.json(plantonistas);
});

// inserindo um novo plantonista
plantonistasRoute.post(function(request, response) {
  var plantonista = {
    id: request.body.id,
    nome: request.body.nome,
    crm: request.body.crm,
    hospital: request.body.hospital
      };

  plantonistas.push(plantonista);
  response.json(plantonista);
});

// listando um plantonista específico, pelo ID
plantonistaRoute.get(function(request, response) {
  var plantonista = plantonistas[request.params.id - 1];
  response.json(plantonista);
});

// alterando os dados de um plantonista, pelo ID
editplantonistaRoute.put(function(request, response) {
  var plantonista = plantonistas[request.params.id - 1];

  plantonista.nome = request.body.nome;
  plantonista.crm = request.body.crm;
  plantonista.hospital = request.body.hospital;


  response.json({ message: "plantonista alterado com sucesso", data: plantonista });
});

// apagando um plantonista
plantonistaRoute.delete(function(request, response) {
  plantonistas.splice(request.params.id, 1);
  response.json({ message: "plantonista apagado com sucesso"});
});

app.use('/api', router);
app.listen(port, function() {
  console.log('Insert plantonista on port: ' + port);
});
