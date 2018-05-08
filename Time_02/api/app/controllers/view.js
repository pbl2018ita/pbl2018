'use strict'

var mongoose = require('mongoose')
var Reserva = mongoose.model('Reserva')
var Leitos = mongoose.model('Leitos')
var leitos_disponiveis;
var reserva;

function getLeitos(callback) {
  Leitos.find({}, function(err, leitos) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, leitos);
    }
  });
};

getLeitos(function(err, leitos) {
    if (err) {
        console.log(err);
    }
   leitos_disponiveis = leitos
});



function getReserva(callback) {
  Reserva.find({}, function(err, reservas) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, reservas);
    }
  });
};

getReserva(function(err, reservas) {
    if (err) {
        console.log(err);
    }
   reserva = reservas;

});





exports.getInfos = function (req, res) {
    
    

    var obj ={}

    obj['leitos'] = leitos_disponiveis

    obj['reserva'] = reserva
    //var all_obj = Object.assign(leitos_disponiveis, reserva);

    console.log(obj);


    res.render('index.ejs', {result: obj})


    /*Reserva.find({}, function(err, leitos) {
      if (err) return res.status(400).send(err)
      if (leitos){
        res.render('index.ejs', {result: leitos})
      }
      else return res.status(400).json({ message: 'Leito não encontrado' })
    });  */
}
