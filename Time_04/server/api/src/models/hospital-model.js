'use strict'

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    registro:{
        type : Number,
        required: true,
        unique : true
    },
    nome:{
        type : String,
        required : true
    },
    estado :{
        type : String,
        required: true,
    },
    cidade: {
        type : String,
        required : true
    },
    latitude : {
        type: Number,
        required : true
    },
    longitude : {
        type: Number,
        required : true
    },
    recursos :{
        type : Boolean,
        required :true
    }
});


module.exports = mongoose.model('Hospital', schema);