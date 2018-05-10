'use strict'

var mongoose = require('mongoose')
var Leitos = mongoose.model('Leitos')

exports.getLeitos = function (req, res) {

  var hospital = req.query.hospital
  var status = req.query.status
  var identificador = req.query.identificador

  var result = {
      "hospital": {
        "identificador": identificador,
        "nome": hospital,
      }
  }
      
  Leitos.find({hospital:hospital, status:status},{setor:1, andar:1, ala:1,tipo:1}, function(err, leitos) {
    if (err) return res.status(400).send(err)
    if (leitos){
      result["hospital"]["leitos"] = leitos
      res.send(result)
    }
    else return res.status(400).json({ message: 'Leito não encontrado' })
  });
}