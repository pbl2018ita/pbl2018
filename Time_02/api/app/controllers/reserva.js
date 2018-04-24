'use strict'

var mongoose = require('mongoose')
var Reserva = mongoose.model('Reserva')

exports.newReservas = function (req, res) {
  //res.send("Nova Reserva")

  console.log(req.body)
}

exports.getReservas = function (req, res) {
  res.send("Buscar Reservas")
}

exports.updateReservas = function (req, res) {
  res.send("Editar Reserva")
}

exports.deleteReservas = function (req, res) {
  res.send("Remover Reserva")
}