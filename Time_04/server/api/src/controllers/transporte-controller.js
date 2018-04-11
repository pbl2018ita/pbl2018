
'use strict'
const mongoose = require('mongoose');
const Transporte = mongoose.model('Transporte');

exports.get = (req, res, next) =>{
    Transporte.find({}).then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send({message : 'Erro :', data: e});
    });
};

exports.getById =(req, res, next) =>{
    const regis  =  req.params.registro;
    Transporte.find({registro : regis}).then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send({message : 'Erro :', data: e});
    });
};
exports.post =  (req, res, next) =>{
    var transporte =  new Transporte(req.body);
    transporte
    .save().then(x => {
        res.status(201).send({message : 'Transporte cadastrado com sucesso'});
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