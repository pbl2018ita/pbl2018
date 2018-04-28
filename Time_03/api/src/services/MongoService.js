'use strict'

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB || 'mongodb://ts03:OhFaiy2u@ds127589.mlab.com:27589/stagihobd-ts03');

const resultado_consulta = require('../models/consult-model');

const consult = mongoose.model('resultado_consulta');



//resultado_consulta
exports.getConsult = function (tipo_lesao, area_corporal, Gravidade) {
    var dic
    //var dic = mongoose.model('resultado_consulta');
    //
    //dic.find({ tipo_lesao: tipo_lesao, area_corporal: area_corporal, Gravidade: Gravidade }, function (err, r) {
    //    if (err) return err
    //    if (r)
    //        return r["Setor"]
    //    else
    //        return "Setor nao encontrado"
    //})

    var db = mongoose.connection;

    db.on('error', function (err) {
        console.log('connection error', err);
    });
    db.once('open', function () {
        var dic = mongoose.model('resultado_consulta');
        console.log('connected.');
    });
}

