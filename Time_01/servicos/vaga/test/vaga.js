'use strict';

const chai = require('chai');
const expect = require('chai').expect;
chai.use(require('chai-http'));
var app = require('../routes/vaga.js');

describe('API endpoint /vagas', function() {
  this.timeout(15000);

  before(function() {
  });

  after(function() {
  });

  it('Deve retornar um JSON contendo as VAGAS (plantonista + especialista + leitos) de um hospital', function() {
     return chai.request("http://localhost:3000/api")
       .get('/vagas')
       .then(function(res) {
         expect(res).to.have.status(200);
         expect(res).to.be.json;
       });
   });

  // GET - SERVIÇO INVÁLIDO
  it('Serviço Inválido', function() {
    return chai.request("http://localhost:3000/api")
      .get('/SERVICO_INVALIDO')
      .then(function(res) {
        expect(res).to.have.status(404);
      });
  });
});
