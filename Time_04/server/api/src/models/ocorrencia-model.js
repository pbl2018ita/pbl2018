'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    id:{
        type : Number,
        required: true,
        unique : true
    },
    quantidade_pacientes:{
        type : Number,
        required : true
    },
    data :{
        type : String,
        required: true,
    },
    horario: {
        type : String,
        required : true
    },
    hospital_ref : {
        type: Number,
        required : true
    },
    tempo_percurso :{
        type : String,
        required : true
    }
});


module.exports = mongoose.model('Ocorrencia', schema);