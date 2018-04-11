'use strict' //forca o javascript ser mais criterioso, para falhar compilacao

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express(); //Cria aplicacao
const router = express.Router(); // criar um router

//conecta com o MongoDb
mongoose.connect('mongodb://ts03:OhFaiy2u@ds127589.mlab.com:27589/stagihobd-ts03');

//poderia configurar outas coisas pelo bodyParser, como tamanho maximo da requisicao
app.use(bodyParser.json()); //todo conteudo ser convertido para json
app.use(bodyParser.urlencoded({ extended: false })); //para codificar as urls

//Carrega as rotas
const indexRoute = require('./routes/index-route');
app.use('/', indexRoute);

const us101Route = require('./routes/us101-route');
app.use('/us101', us101Route);

const mapRoute = require('./routes/map-route');
app.use('/map', mapRoute);

const kafkaRoute = require('./routes/kafka-route');
app.use('/kafka', kafkaRoute);

module.exports = app;