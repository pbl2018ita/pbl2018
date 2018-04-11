'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    docto_cpf:{
        type : Number,
        required: true,
        unique : true
    },
    nome:{
        type : String,
        required : true
    },
    idade :{
        type : Number,
        required: true,
    },
    sexo: {
        type : String,
        required : true
    },
    ocorrencia : {
        type: Number,
        required : true,
        index : true
    }
});


module.exports = mongoose.model('Paciente', schema);