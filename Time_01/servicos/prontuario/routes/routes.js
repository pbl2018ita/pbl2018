var express = require('express');
var router = express.Router();
var Prontuario = require('../models/prontuario'); //acessa esquema de dados do MongoDB

//setup das rotas

router.get("/", function(req, res){
    res.json({message: "Esta rodando em /"});
});

//metodo para exibir todos os prontuarios
router.get("/prontuario", function(req, res, next){
    Prontuario.find({}).then(function(prontuario){
        res.send(prontuario);
    });
});

//metodo para exibir um prontuario a partir de um ID
router.get("/prontuario/:id", function(req, res, next){
    Prontuario.findById(req.params.id).then(function(prontuario){
        res.send(prontuario);
    });
});

//metodo para cadastrar novo prontuario
router.post("/prontuario", function(req, res, next){
    Prontuario.create(req.body).then(function(prontuario){
        res.send(prontuario);//retorna prontuario para verificacao
    }).catch(next);
});

//metodo para alterar prontuario
router.put("/prontuario/:id", function(req, res, next){
    Prontuario.findByIdAndUpdate(req.params.id, req.body).then(function(){
        Prontuario.findOne({_id: req.params.id}).then(function(prontuario){
            res.send(prontuario);
            });
    });
});

//metodo para remover um prontuario
router.delete("/prontuario/:id", function(req, res, next){
    Prontuario.findByIdAndRemove({_id: req.params.id}).then(function(prontuario){
        res.send(prontuario);
    });
});

module.exports = router;


