
'use strict'
const mongoose = require('mongoose');
const Plantonista = mongoose.model('Plantonista');

exports.get = (req, res, next) =>{
    Plantonista.find({}).then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send({message : 'Erro :', data: e});
    });
};

exports.getById =(req, res, next) =>{
    const cod  =  req.params.codigo;
    Plantonista.find({codigo : cod}).then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send({message : 'Erro :', data: e});
    });
};
exports.post =  (req, res, next) =>{
    var plantonista =  new Plantonista(req.body);
    plantonista
    .save().then(x => {
        res.status(201).send({message : 'Plantonista cadastrado com sucesso'});
    }).catch(e => {
        res.status(400).send({message : 'Erro ao efetuar o cadastro ', data: e});
    });
    
};

exports.put = (req,res,next) => {
    Plantonista.findOneAndUpdate(req.params.codigo,{
        $set : {
        nome: req.body.nome,
        crm: req.body.crm,
        hospital: req.body.hospital
    }
}).then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send({message : 'Erro :', data: e});
    });
};

exports.del = (req, res, next) => {
    const cod =  req.params.codigo;
    Plantonista.findOneAndRemove({codigo : cod}).then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send({message : 'Erro :', data: e});
    });
    
};