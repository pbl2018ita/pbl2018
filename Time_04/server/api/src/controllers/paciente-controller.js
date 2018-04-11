
'use strict'
const mongoose = require('mongoose');
const Paciente = mongoose.model('Paciente');

exports.get = (req, res, next) =>{
    Paciente.find({}).then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send({message : 'Erro :', data: e});
    });
};

exports.getById =(req, res, next) =>{
    const cpf  =  req.params.docto_cpf;
    Paciente.find({docto_cpf : cpf}).then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send({message : 'Erro :', data: e});
    });
};
exports.post =  (req, res, next) =>{
    var paciente =  new Paciente(req.body);
    paciente
    .save().then(x => {
        res.status(201).send({message : 'Paciente cadastrado com sucesso'});
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