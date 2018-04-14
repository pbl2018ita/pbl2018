
'use strict'
const mongoose = require('mongoose');
const Ocorrencia = mongoose.model('Ocorrencia');

exports.get = (req, res, next) =>{
    Ocorrencia.find({}).then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send({message : 'Erro :', data: e});
    });
};

exports.getById =(req, res, next) =>{
    const id  =  req.params.id;
    Ocorrencia.find({id : id}).then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send({message : 'Erro :', data: e});
    });
};


exports.post =  (req, res, next) =>{
    var ocorrencia =  new Ocorrencia(req.body);
    ocorrencia
    .save().then(x => {
        res.status(201).send({message : 'Ocorrência cadastrada com sucesso'});
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