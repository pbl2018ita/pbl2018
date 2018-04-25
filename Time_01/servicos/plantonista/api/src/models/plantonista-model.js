'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//mudar o Schema 
const schema = new Schema({
    codigo:{
        type : Number,
        required: true,
        unique : true
    },
    nome:{
        type : String,
        required : true
    },
    crm :{
        type : Number,
        required: true,
    },
    hospital: {
        type : String,
        required : true
    }
});


module.exports = mongoose.model('Plantonista', schema);