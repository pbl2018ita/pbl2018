
'use strict'
const mongoose = require('mongoose');
const Hospital = mongoose.model('Hospital');

exports.get = (req, res, next) =>{
    Hospital.find({}).then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send({message : 'Erro :', data: e});
    });
};

exports.getById =(req, res, next) =>{
    const regis  =  req.params.registro;
    Hospital.find({registro : regis}).then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send({message : 'Erro :', data: e});
    });
};

exports.getRecursos =(req, res, next) =>{
    const rec  =  req.params.recursos;
    Hospital.find({recursos : rec}).then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send({message : 'Erro :', data: e});
    });
};
exports.post =  (req, res, next) =>{
    var hospital =  new Hospital(req.body);
    hospital
    .save().then(x => {
        res.status(201).send({message : 'Hospital cadastrado com sucesso'});
    }).catch(e => {
        res.status(400).send({message : 'Erro ao efetuar o cadastro ', data: e});
    });
    
};

exports.put = (req,res,next) => {
    const id = req.params.id;
    res.status(201).send({ 
        id: id,
        item: req.body
    });
};