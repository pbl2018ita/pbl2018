'use strict'


const express =  require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app =  express();
const router = express.Router();

//conectar ao banco

mongoose.connect('mongodb://ts04:uqu7Shoo@ds127129.mlab.com:27129/stagihobd-ts04')


const Paciente = require('./models/paciente-model');
const Acidente = require('./models/acidente-model');
const Transporte = require('./models/tansporte-model');
const Hospital = require('./models/hospital-model');


const index = require('./routes/index');
const pacientes = require('./routes/paciente');
const acidentes = require('./routes/acidente');
const transportes = require('./routes/transporte');
const hospitais = require('./routes/hospital');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));



app.use('/', index);
app.use('/pacientes', pacientes);
app.use('/acidentes', acidentes);
app.use('/transportes', transportes);
app.use('/hospitais', hospitais);



module.exports = app;