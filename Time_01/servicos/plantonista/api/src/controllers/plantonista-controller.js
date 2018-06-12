'use strict'
const mongoose = require('mongoose');
const Plantonista = mongoose.model('Plantonista');

// Kafka 


var kafka = require('kafka-node')
var Producer = kafka.Producer
var client = new kafka.Client("stagihobd.hashtagsource.com:2181")
var producer = new Producer(client);


var topico = "plantonista";
var topicoOnline = false;


// Configurando o Kafka
producer.on('ready', function () {
    producer.createTopics([topico], false, function (err, data) { });
  console.log("Producer para PLANTONISTA está pronto, no tópico '" + topico + "'");
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

    Plantonista.find({}).then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send({message : 'Erro :', data: e});
    });
};

exports.getById =(req, res, next) =>{
    const cod  =  req.params.codigo;
    Plantonista.find({codigo : cod}).then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send({message : 'Erro :', data: e});
    });
};
exports.post =  (req, res, next) =>{
    var plantonista =  new Plantonista(req.body);
    plantonista
    .save().then(x => {
       console.log("topico = " + topico  )//sendMessageKafka(topico, req.body);
        res.status(201).send({message : 'Plantonista cadastrado com sucesso'});
        console.log("plantonista-controller: " + JSON.stringify(req.body));
    }).catch(e => {
        res.status(400).send({message : 'Erro ao efetuar o cadastro ', data: e});
        console.log("plantonista-controller: 400 " + JSON.stringify(req.body));
    });
    
};

exports.put = (req,res,next) => {
    console.log(req.params.codigo)
    Plantonista.findOneAndUpdate({codigo: req.params.codigo},{
        $set : {
        nome: req.body.nome,
        crm: req.body.crm,
        hospital: req.body.hospital
    }
    // }).then(data => res.status(200).send(data) ) 
    }).then( () => Plantonista.findOne({codigo: req.params.codigo})
                    .then( newPlantonista =>  res.status(200).send(newPlantonista) )
        ).catch(e => {
            res.status(400).send({message : 'Erro :', data: e});
        });
};

exports.del = (req, res, next) => {
    const cod =  req.params.codigo;
    Plantonista.findOneAndRemove({codigo : cod}).then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send({message : 'Erro :', data: e});
    });
    
};
