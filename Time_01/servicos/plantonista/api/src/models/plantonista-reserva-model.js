'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reservaPlantonistaSchema = new Schema({
            crm: { type: Number, required: true},
         status: { type: String, required: true}, // reservado - ocupado - cancelado - finalizado
    id_paciente: { type: String },
       id_leito: { type: String },
data_internacao: { type: Date }
})

module.exports = mongoose.model('ReservaPlantonista', reservaPlantonistaSchema)
