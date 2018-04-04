var express = require('express');
var router = express.Router();
var Especialista = require('../models/especialista'); //acessa esquema de dados do MongoDB

//setup das rotas

//metodo para retornar a lista de todos especialistas 
router.get('/especialistas', function(req, res, next){
    Especialista.find({}).then(function(especialista){
        res.send(especialista);
    });
});

//metodo para retornar lista de especialistas disponiveis
router.get('/especialistas/disponivel', function(req, res, next){
    Especialista.find({"disponivel" : true}).then(function(especialista){
        res.send(especialista);
    });
});

//metodo para inserir novo especialista
router.post('/especialistas', function(req, res, next){
    Especialista.create(req.body).then(function(especialista){
        res.send(especialista);//retorna os dados inseridos para ser conferir
    }).catch(next);
});

//metodo para alterar dados de algum especialista
router.put('/especialistas/:id', function(req, res, next){
    Especialista.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
         //busca novamente o especialista atualizado no banco
         Especialista.findOne({_id: req.params.id}).then(function(especialista){
             //retorna o especialista atualizado para conferir
             res.send(especialista);
         });
    });
});

//metodo para remover um especialsta
router.delete('/especialistas/:id', function(req, res, next){
    Especialista.findByIdAndRemove({_id: req.params.id}).then(function(especialista){
        //retorna o especialista removido para conferir
        res.send(especialista);
    });
});

module.exports = router;


