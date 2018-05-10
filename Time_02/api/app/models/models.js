
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




var PacienteSchema = new Schema({
  patientID: { type: String },
  firstName: { type: String },
  lastName: { type: String },
  email: { type: String },
  phones: Schema.Types.Mixed,
  city: { type: String },
  uf: { type: String },
  coordinates:Schema.Types.Mixed,
  address: Schema.Types.Mixed
})



var ReservaSchema = new Schema({
  id_paciente: { type: String },
  id_leito: { type: String },
  id_plantonista: { type: String },
  id_especialista: { type: String },
  data_internacao: { type: Date },
  status: { type: String },
})


module.exports = mongoose.model('Leitos', LeitoSchema)
module.exports = mongoose.model('Paciente', PacienteSchema)
module.exports = mongoose.model('Reserva', ReservaSchema)
          