
'use strict'
const mongoose = require('mongoose');
const Acidente = mongoose.model('Acidente');

exports.get = (req, res, next) =>{
    Acidente.find({}).then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send({message : 'Erro :', data: e});
    });
};

exports.getById =(req, res, next) =>{
    const cod  =  req.params.codigo;
    Acidente.find({codigo : cod}).then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send({message : 'Erro :', data: e});
    });
};
exports.post =  (req, res, next) =>{
    var acidente =  new Acidente(req.body);
    acidente
    .save().then(x => {
        res.status(201).send({message : 'Acidente cadastrado com sucesso'});
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