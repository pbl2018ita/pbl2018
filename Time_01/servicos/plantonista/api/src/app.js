'use strict'


const express =  require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app =  express();
const router = express.Router();

//conectar ao banco

mongoose.connect('mongodb://ts01:zi7EezaW@ds127129.mlab.com:27129/stagihobd-ts01')


const Transporte = require('./models/plantonista-model');



const index = require('./routes/index');
const transportes = require('./routes/plantonista');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));



app.use('/', index);
app.use('/plantonista', transportes);




module.exports = app;