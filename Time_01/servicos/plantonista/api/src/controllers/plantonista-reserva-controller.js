
'use strict'
const mongoose = require('mongoose');
const ReservaPlantonista = mongoose.model('ReservaPlantonista');

exports.get = (req, res, next) =>{
    ReservaPlantonista.find({}).then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send({message : 'Erro :', data: e});
    });
};

exports.getById =(req, res, next) =>{
    var crm  =  req.params.crm;
    var status  =  req.params.status;
    ReservaPlantonista.find({crm : crm, status: status}).then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send({message : 'Erro :', data: e});
    });
};

exports.post =  (req, res, next) =>{

  console.log("plantonista-reserva-controller: " + req.body);

    var ReservaPlantonista =  new ReservaPlantonista(req.body);
    ReservaPlantonista
    .save().then(x => {
        res.status(201).send({message : 'Reserva do plantonista cadastrado com sucesso'});
    }).catch(e => {
        res.status(400).send({message : 'Erro ao efetuar o cadastro ', data: e});
    });

};

exports.put = (req,res,next) => {
    ReservaPlantonista.findOneAndUpdate(req.params.codigo,{
        $set : {
        crm: req.body.crm,
        status: req.body.status
    }
}).then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send({message : 'Erro :', data: e});
    });
};
