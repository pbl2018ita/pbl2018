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
    privado :{
        type : Boolean,
        required: true,
    },
    disponivel: {
        type : Boolean,
        required : true
    },
    reg_hospital: {
        type : Number,
        required : true
    }
});


module.exports = mongoose.model('Transporte', schema);