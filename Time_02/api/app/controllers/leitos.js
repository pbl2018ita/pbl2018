'use strict'

var mongoose = require('mongoose')
var Leitos = mongoose.model('Leitos')

exports.getLeitos = function (req, res) {


  console.log(req.params)

  Leitos.find({status:'livre'}, function(err, comments) {
    // some code here
    console.log(comments)
    res.send(comments)
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


