'use strict'

var mongoose = require('mongoose')
var Reserva = mongoose.model('Reserva')
var kafka = require('kafka-node')
var topico = "cross";
var payloads;
var mensagem;


//Produtor
var Producer = kafka.Producer,
    client = new kafka.Client('stagihobd.hashtagsource.com:2181'),
    producer = new Producer(client);

producer.on('ready', function() {
    console.log('Producer is ready');
});
producer.on('error', function(err) {
    console.log('Producer is in error state');
    console.log(err);
})

// Consumidor
var kafka = require('kafka-node'),
    Consumer = kafka.Consumer,
    client = new kafka.Client('stagihobd.hashtagsource.com:2181'),
    consumer = new Consumer(client, [{
        topic: topico,
        offset: 0
    }], {
        autoCommit: false
    });


consumer.on('message', function(message) {
    mensagem = message
    console.log(message);
});

consumer.on('error', function(err) {
    console.log('Error:', err);
})



exports.newReserva = function(req, res) {
    // Add no kafka
    try {
        var sentMessage = JSON.stringify(req.body);
        payloads = [{
            topic: topico,
            messages: sentMessage,
            partition: 0
        }];
        producer.send(payloads, function(err, data) {
            return;
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            result: "fail"
        });
    }

    // Add mongodb
    var reserva_post = new Reserva({
        id_paciente: req.body.id_paciente,
        id_leito: req.body.id_leito,
        id_plantonista: req.body.id_plantonista,
        id_especialista: req.body.id_especialista,
        data_internacao: req.body.data_internacao
    });
    reserva_post.save(function(err, data) {
        if (err) return res.status(400).send(err);
        res.redirect('/view/reserva');
    });
}


exports.getReservas = function(req, res) {
    Reserva.find({}, function(err, reservas) {
        if (err) {
            console.error(err);
        } else {
            res.send(reservas)
        }
    });
}

exports.updateReserva = function(req, res) {
    var id_reserva = req.body.id_reserva;
    var id_leito = req.body.id_leito;
    var id_paciente = req.body.id_paciente;
    var data_internacao = req.body.data_internacao;
    var id_plantonista = req.body.id_plantonista;
    var id_especialista = req.body.id_especialista;

    Reserva.findById({
        "_id": id_reserva
    }, function(err, result) {
        if (err) return res.status(400).send(err)
        if (result) {
            result.id_paciente = id_paciente,
                result.id_leito = id_leito,
                result.data_internacao = data_internacao
            result.id_plantonista = req.body.id_plantonista,
                result.id_especialista = req.body.id_especialista,

                result.save(function(err) {
                    if (err) return res.status(400).send(err)
                    else res.send("Reserva atualizada com sucesso")
                });
        } else return res.status(400).json({
            message: 'Reserva não encontrada'
        })
    });
}


exports.deleteReserva = function(req, res) {
    Reserva.remove({
        "_id": req.body.id_reserva
    }, function(err, data) {
        if (err) return res.status(400).send(err)
        else res.send("Remover reserva, realizada com sucesso")
    });

}


exports.confReserva = function(req, res) {
    var id_reserva = req.body.id_reserva;
    var id_leito = req.body.id_leito;
    var id_paciente = req.body.id_paciente;
    var data_internacao = req.body.data_internacao;
    var id_plantonista = req.body.id_plantonista;
    var id_especialista = req.body.id_especialista;

    Reserva.findById({
        "_id": id_reserva
    }, function(err, result) {
        if (err) return res.status(400).send(err)
        if (result) {
            result.status = "Ocupado",
                result.save(function(err) {
                    if (err) return res.status(400).send(err)
                    else res.send("Reserva atualizada com sucesso")
                });
        } else return res.status(400).json({
            message: 'Reserva não encontrada'
        })
    });
}
