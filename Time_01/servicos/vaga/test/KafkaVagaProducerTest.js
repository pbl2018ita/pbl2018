// Kafka configuration
var kafka = require('kafka-node')
var Producer = kafka.Producer
var client = new kafka.Client("stagihobd.hashtagsource.com:2181")  //9092 //2181
var producer = new Producer(client);

var topico = "cross";
var countryProducerReady = false ;

producer.on('ready', function () {
    console.log("Producer para VAGA está pronto, no tópico 'cross'");
    countryProducerReady = true;

    produceMessageTest(topico, "{xpto0: 1}");
    produceMessageTest(topico, "{xpto1: 2}");

});

producer.on('error', function (err) {
  console.error("Não foi possível iniciar o Producer do Kafka"+err);
})

function produceMessageTest(topic, msg) {
    payloads = [ { topic: topic, messages: msg } ];

    if (countryProducerReady) {
      producer.send(payloads, function (err, data) {
          console.log(data);
      });
    } else {
        console.error("desculpe, topico 'cross' não está pronto, falha ao enviar a mensagem ao Kafka.");
    }

}
