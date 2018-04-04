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
    
  Leitos.find({hospital:hospital, status:status}, function(err, leitos) {
    if (err) return res.status(400).send(err)
    if (leitos){
      result["hospital"]["leitos"] = leitos
      res.send(result)
    }
    else return res.status(400).json({ message: 'Leito não encontrado' })
  });  
}


exports.addLeitos = function (req, res) {
  var leitos = new Leitos({
    hospital: "hc",
    status: "livre",  // livre - higienizacao - ocupado - servico - reservado - isolado
    setor: "cardiologia",  // cardiologia - pediatria 
    andar: "1",  // 1 - 2 - 3
    ala: "A", // A - B - C
    tipo: "uti", // enfermaria - apartamento - berçario - uti - bloco cirurgico 
  })

  leitos.save(function (err, data) {
    if (err) console.log(err);
    else console.log('Saved : ', data );
    });
}


