
'use strict'
const mongoose = require('mongoose');
const PlantonistaReserva = mongoose.model('plantonistaReserva');

var kafka = require('kafka-node')
var Producer = kafka.Producer
var client = new kafka.Client("stagihobd.hashtagsource.com:2181")
var producer = new Producer(client);

var topico = "plantonista-reserva";
var topicoOnline = false;


// Configurando o Kafka
producer.on('ready', function () {
  producer.createTopics([topico], false, function (err, data) { });
  console.log("Producer para PLANTONISTA-RESERVA está pronto, no tópico '" + topico + "'");
    topicoOnline = true;

});

producer.on('error', function (err) {
  console.error("Não foi possível iniciar o Producer do Kafka"+err);
});

// enviar mensagem ao Kafka
function sendMessageKafka(topic, msg) {
  payloads = [ { topic: topic, messages: msg } ];

  if (topicoOnline) {
    producer.send(payloads, function (err, data) {
        console.log(data);
    });
  } else {
      console.error("Desculpe, topico '" + topico + "' não está pronto, falha ao enviar a mensagem ao Kafka.");
  }
}

exports.get = (req, res, next) =>{
    PlantonistaReserva.find({}).then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send({message : 'Erro :', data: e});
    });
};

exports.getById =(req, res, next) =>{
    var crm  =  req.params.crm;
    var status  =  req.params.status;
    PlantonistaReserva.find({crm : crm, status: status}).then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send({message : 'Erro :', data: e});
    });
};

exports.post =  (req, res, next) =>{

 

    var plantonistaReserva =  new PlantonistaReserva(req.body);
    plantonistaReserva
    .save().then(x => {
       console.log("topico = " + topico  ) //sendMessageKafka(topico, req.body);
        res.status(201).send({message : 'Reserva do plantonista cadastrado com sucesso'});
         console.log("plantonista-reserva-controller: " + JSON.stringify(req.body));
    }).catch(e => {
        res.status(400).send({message : 'Erro ao efetuar o cadastro ', data: e});
        console.log("plantonista-reserva-controller: 400 " + JSON.stringify(req.body));
    });

};

exports.put = (req,res,next) => {
        //PlantonistaReserva.findOneAndUpdate(req.params.codigo,{
    PlantonistaReserva.findOneAndUpdate({crm: req.params.crm},{
        $set : {
            //crm: req.body.crm,
            status: req.body.status
        }
    // }).then(data => res.status(200).send(data) ) 
    }).then(() => PlantonistaReserva.findOne({crm: req.params.crm})
                    .then( newStatus =>  res.status(200).send(newStatus) )
        ).catch(e => {
            res.status(400).send({message : 'Erro :', data: e});
        });
};
