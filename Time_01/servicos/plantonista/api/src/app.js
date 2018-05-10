'use strict'

const express =  require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app =  express();
const router = express.Router();

//conectar ao banco

mongoose.connect('mongodb://ts01:zi7EezaW@ds127129.mlab.com:27129/stagihobd-ts01')
var plantonista        = require('./models/plantonista-model');
var plantonistaReserva = require('./models/plantonistaReserva-model');

var index              = require('./routes/index');

var plantonistas       = require('./routes/plantonista');
var plantonistaReservas= require('./routes/plantonista-reserva');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.use('/', index);
app.use('/plantonista', plantonistas);
app.use('/plantonista-reserva', plantonistaReservas);

module.exports = app;
