'use strict'

var mongoose = require('mongoose')
var Reserva = mongoose.model('Reserva')
var Leitos = mongoose.model('Leitos')


exports.getInfos = function (req, res) {



  Leitos.find({}, function(err, leitos) {
      if (err) return res.status(400).send(err)
      if (leitos){
        res.render('index.ejs', {result: leitos})
      }
      else return res.status(400).json({ message: 'Leito não encontrado' })
    });  
}
