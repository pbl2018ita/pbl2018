'use strict' 

const express = require('express');
const bodyParser = require('body-parser');

//cria e configura a aplicacao
const app = express();

app.use(bodyParser.json()); //todo conteudo deve convertido para json
app.use(bodyParser.urlencoded({ extended: false })); //para codificar as urls

//precisa melhorar isto aqui
//app.use(express.static(__dirname + '/views'));

const indexRoute = require('./routes/index-route')(app);
app.use('/', indexRoute);

const crossRoute = require('./routes/cross-route')(app);
app.use('/cross', crossRoute);

//desativado - verificar
//const us101Route = require('./routes/us101-route');
//app.use('/us101', us101Route);

//desativado - verificar
//const mapRoute = require('./routes/map-route');
//app.use('/map', mapRoute);

//desativado - verificar
//const kafkaRoute = require('./routes/kafka-route');
//app.use('/kafka', kafkaRoute);

module.exports = app;