// fazendo as referencias para rodar a aplicacao
var express = require('express');
var bodyParser = require('body-parser');

// configurando a aplicacao
var app = express();
var port = process.env.PORT || 9000;
var router = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// criando um array para criar dados com lista de hospitais
var hospitais = [
  { id: 1, nome: 'hospital 1', leitos: '30', utilizados: '20', vagas: '10' },
  { id: 2, nome: 'hospital 2', leitos: '40', utilizados: '25', vagas: '15' },
  { id: 3, nome: 'hospital 3', leitos: '4', utilizados: '2', vagas: '2' }
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
var hospitaisRoute = router.route('/hospital');
var hospitalRoute = router.route('/hospital/:id');
var edithospitalRoute = router.route('/hospital/:id/edit');

// listando todos os hospitais existentes
hospitaisRoute.get(function(request, response) {
  response.json(hospitais);
});

// inserindo um novo hospital
hospitaisRoute.post(function(request, response) {
  var hospital = {
    id: request.body.id,
    nome: request.body.nome,
    leitos: request.body.leitos,
    utilizados: request.body.utilizados,
    vagas: request.body.vagas
  };

  hospitais.push(hospital);
  response.json(hospital);
});

// listando um hospital específico, pelo ID
hospitalRoute.get(function(request, response) {
  var hospital = hospitais[request.params.id - 1];
  response.json(hospital);
});

// alterando os dados de um hospital, pelo ID
edithospitalRoute.put(function(request, response) {
  var hospital = hospitais[request.params.id - 1];

  hospital.nome = request.body.nome;
  hospital.leitos = request.body.leitos;
  hospital.utilizados = request.body.utilizados;
  hospital.vagas = request.body.vagas;

  response.json({ message: "hospital alterado com sucesso", data: hospital });
});

// apagando um hospital
hospitalRoute.delete(function(request, response) {
  hospitais.splice(request.params.id, 1);
  response.json({ message: "hospital apagado com sucesso"});
});

app.use('/api', router);
app.listen(port, function() {
  console.log('Insert hospital on port: ' + port);
});
