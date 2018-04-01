'use strict' //forca o javascript ser mais criterioso, para falhar compilacao

const express = require('express');
const bodyParser = require('body-parser');


const app = express(); //Cria aplicacao
const router = express.Router(); // criar um router

//poderia configurar outas coisas pelo bodyParser, como tamanho maximo da requisicao
app.use(bodyParser.json()); //todo conteudo ser convertido para json
app.use(bodyParser.urlencoded({ extended: false })) //para codificar as urls

//get -> obter informacoes
const route = router.get('/', (req, res, next) => {
    //200 -> OK
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

//put -> atualizar informacoes
const put = router.put('/:id', (req, res, next) => {
    let id = req.params.id;
    res.status(201).send({
        id: id,
        item: req.body
    });
});

const del = router.delete('/', (req, res, next) => {
    res.status(200).send(req.body);
});

app.use('/', route);
app.use('/teste', create);
app.use('/teste', put);
app.use('/teste', del);

module.exports = app;