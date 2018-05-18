'use strict';

const chai = require('chai');
const expect = require('chai').expect;
chai.use(require('chai-http'));
var app = require('../main.js');

describe('API endpoint /especialistas', function() {
      this.timeout(5000);

      before(function() {
            });

      after(function() {
            });

      it('Deve retornar lista de especialistas', function() {
               return chai.request("http://localhost:9000/api")
                 .get('/especialistas')
                 .then(function(res) {
                              expect(res).to.have.status(200);
                              expect(res).to.be.json;
                            });
             });

      it('Deve cadastrar um novo especialista', function() {
               return chai.request("http://localhost:9000/api")
                 .post('/especialistas')
                 .then(function(res) {
                              expect(res).to.have.status(200);
                            
                            });
             });

      it('Deve retornar um especialista disponivel', function() {
               return chai.request("http://localhost:9000/api")
                 .get('/especialistas/disponivel')
                 .then(function(res) {
                              expect(res).to.have.status(200);
                              expect(res).to.be.json;
                            });
             });

      it('Deve remover um especialista cadastrado', function() {
               return chai.request("http://localhost:9000/api")
                 .delete('/especialistas/:_id')
                 .then(function(res) {
                              expect(res).to.have.status(200);
                            });
             });


      // GET - SERVIÇO INVÁLIDO
       it('Serviço Inválido', function() {
           return chai.request("http://localhost:9000/api")
                 .get('/SERVICO_INVALIDO')
                 .then(function(res) {
                     expect(res).to.have.status(404);
        });
    });
});
