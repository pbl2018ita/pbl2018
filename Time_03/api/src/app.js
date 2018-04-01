'use strict' //forca o javascript ser mais criterioso, para falhar compilacao

const express = require('express');
const bodyParser = require('body-parser');
const app = express(); //Cria aplicacao

const router = express.Router(); // criar um router

//get -> obter informacoes
const route = router.get('/', (req, res, next) => {
    //200 -> 0
    //201 -> created
    //400 -> Bad request
    //401 -> nao autenticado
    //403 -> acesso negado
    //500 -> Internal server error
    res.status(200).send({
        title: "Node store api",
        version: "0.0.2"
    });
});

//post -> enviar informacoes
const create = router.post('/', (req, res, next) => {
    res.status(201).send(req.body);
});

app.use('/', route);

module.exports = app;