'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const consultSchema = new Schema({
    //o Schema cria automaticamente um _id do tipo GUID
    tipo_lesao: { type: String, required: true, trim: true },
    area_corporal: { type: String, required: true, trim: true},
    Gravidade: { type: String, required: true },
    Setor: { type: String, required: true }
});

module.exports = mongoose.model('resultado_consulta', consultSchema);