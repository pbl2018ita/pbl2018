'use strict' //forca o javascript ser mais criterioso, para falhar compilacao

const express = require('express');
const bodyParser = require('body-parser');


const app = express(); //Cria aplicacao
const router = express.Router(); // criar um router

//poderia configurar outas coisas pelo bodyParser, como tamanho maximo da requisicao
app.use(bodyParser.json()); //todo conteudo ser convertido para json
app.use(bodyParser.urlencoded({ extended: false })) //para codificar as urls

const indexRoute = require('./routes/index-route')
const us101Route = require('./routes/us101-route')


app.use('/', indexRoute);
app.use('/us101', us101Route);
app.use('/us101', us101Route);
app.use('/us101', us101Route);

module.exports = app;