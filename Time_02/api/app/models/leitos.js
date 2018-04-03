
'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var LeitoSchema = new Schema({

  hospital: { type: String },

  status: { type: String, required: true },  // livre - higienizacao - ocupado - servico - reservado - isolado

  setor: { type: String },  // cardiologia - pediatria 

  andar: { type: String },  // 1 - 2 - 3

  ala: { type: String }, // A - B - C

  tipo: { type: String } // enfermaria - apartamento - berçario - uti - bloco cirurgico 

})

module.exports = mongoose.model('Leitos', LeitoSchema)