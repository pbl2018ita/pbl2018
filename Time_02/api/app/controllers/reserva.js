'use strict'

var mongoose = require('mongoose')
var Reserva = mongoose.model('Reserva')

exports.newReservas = function (req, res) {
  //res.send("Nova Reserva") POST
  var reserva_post = new Reserva ({
    id_paciente: req.body.id_paciente,
    id_leito: req.body.id_leito,
    data_internacao: req.body.data_internacao
  });
  reserva_post.save(function (err, data) {    	
      if (err) return res.status(400).send(err)    	
        else res.send("Nova Reserva realizada com sucesso")    
      });
}

exports.getReservas = function (req, res) {
  res.send("Buscar Reservas")
}

exports.updateReservas = function (req, res) {
  res.send("Editar Reserva")
}

exports.deleteReservas = function (req, res) {
  Reserva.remove ( {"_id": req.body.id_reserva}, function (err, data) {    	
    if (err) return res.status(400).send(err)    	
      else res.send("Remover reserva, realizada com sucesso")    
    });

}