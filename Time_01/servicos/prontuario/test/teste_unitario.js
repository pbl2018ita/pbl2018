'use strict';

const chai = require('chai');
const expect = chai.expect;
chai.use(require('chai-http'));
var app = require('../index.js');

describe("/prontuario", function(){
    this.timeout(5000);
    before(function(){
    });
    after(function(){
    });


    it("Consultar lista de prontuarios cadastrados", function(){
        return chai.request("http://localhost:9000")
            .get("/prontuario")
            .then(function(res){
                expect(res).to.have.status(200);
                expect(res).to.be.json;
            });
    });

    it("Consultar servico/pagina nao cadastrada", function(){
        return chai.request("http://localhost:9000")
            .get("/teste")
            .then(function(res){
            expect(res).to.have.status(404);
            });
    });

});
