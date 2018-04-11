'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    codigo :{
        type : Number,
        require : true,
        unique : true
    },
    date_time:{
        type : Date,
        required : true
    },
    descricao :{
        type : String,
        required: true,
    },
    gravidade: {
        type : Number,
        required : true
    },
    latitude: {
        type : Number,
        required : true
    },
    longitude: {
        type : Number,
        required : true
    },
    estado: {
        type : String,
        required : true
    },
    cidade: {
        type : String,
        required : true
    },
    ocorrencia : {
        type: Number,
        required : true,
        index : true
    }
});


module.exports = mongoose.model('Acidente', schema);