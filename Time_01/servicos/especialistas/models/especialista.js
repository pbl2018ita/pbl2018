var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//esquema para salvar dados dos especialistas
var EspecialistaSchema = new Schema({
    _id:{
        type: String,
        required: [true, 'Eh necessario CRM']
    },
    especialidade:{
        type: String
    },
    status:{
        type: String,
        deafult: "indisponivel"
    }
});

var Especialista = mongoose.model('especialista', EspecialistaSchema);

module.exports = Especialista;
