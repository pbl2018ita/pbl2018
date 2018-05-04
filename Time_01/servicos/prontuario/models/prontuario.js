var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//esquema para salvar dados dos prontuarios
var ProntuarioSchema = new mongoose.Schema({
    _id:{
        type: String
    },
    nome:{
        type: String
    },
    data_nasc:{
        type: String
    },
    alergias:{
        type: String
    },
    medicamentos:{
        type: String
    },
    medico_resp:{
        type: String
    },
    leito:{
        type: String
    }
});
var Prontuario = mongoose.model('prontuario', ProntuarioSchema);

module.exports = Prontuario;
