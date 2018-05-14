'use strict'

var mongoose = require('mongoose')
var Leitos = mongoose.model('Leitos')
var kafka = require('kafka-node')
var Producer = kafka.Producer,
    client = new kafka.Client('stagihobd.hashtagsource.com:2181'),
    producer = new Producer(client);

producer.on('ready', function () {
    console.log('Producer is ready');
});
producer.on('error', function (err) {
    console.log('Producer is in error state');
    console.log(err);
})


var topico = "cross";
var payloads;
var query_leitos;
var leitos_disponiveis;


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


  var obj = {};

  obj['leitos'] = leitos_disponiveis.filter( x => {
      return x.hospital == req.query.hospital && x.status == req.query.status;
  })
   
  try {
    var sentMessage = JSON.stringify(obj);
    payloads = [
      { topic: topico, messages:sentMessage , partition: 0 }
    ];
    producer.send(payloads, function (err, data) {
      console.log('Resultado adicionado no kafka');
    });
  }catch (err) {
    console.error(err);
    res.status(500).send({result: "fail"});
  }
  
  res.send(obj);
}