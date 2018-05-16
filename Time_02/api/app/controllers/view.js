'use strict'

var mongoose = require('mongoose')
var Reserva = mongoose.model('Reserva')
var Leitos = mongoose.model('Leitos')
const async = require('async');
var request = require('request');
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


function httpGet(url, callback) {
  const options = {
    url :  url,
    json : true
  };
  request(options,
    function(err, res, body) {
      callback(err, body);
    }
  );
}


exports.getReservaView = function (req, res) {
  var obj = {}
  obj['reserva'] = reserva
  res.render('reserva.ejs', {result: obj})
}


exports.getLeitosView = function (req, res) {
  var obj = {}

  if (req.query.filterOption) {
    obj['leitos'] = leitos_disponiveis.filter( x => {
      return x.setor == req.query.filterOption;
    })
  } else {
    obj['leitos'] = leitos_disponiveis
  }
  res.render('index.ejs', {result: obj})
}


exports.getEspecialistaView = function (req, res) {
  var obj = {}
  try {  
    var url = ['https://stagihobd-ts01.herokuapp.com/api/especialistas']
    async.map(url, httpGet, function (err, data){
      if (err) return console.log(err);
      obj['especialista'] = data[0];
      res.render('especialista.ejs', {result: obj})
    });
  } catch(err) {
    console.log(err)
    res.send('Ocorreu um erro')
  }
}


exports.getPlantonistaView = function (req, res) {
  var obj = {}
  try {  
    var url = ['https://pbl2018-hospital-plantonista.herokuapp.com/api/plantonista']
    async.map(url, httpGet, function (err, data){
      if (err) return console.log(err);
      console.log(data[0])
      obj['plantonista'] = data[0];
      res.render('plantonista.ejs', {result: obj})
    });
  } catch(err) {
    console.log(err)
    res.send('Ocorreu um erro')
  }
}


