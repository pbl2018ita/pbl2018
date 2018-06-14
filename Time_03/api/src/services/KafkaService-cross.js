'use strict'

/*
 Definido os seguintes topicos:  
 * cross => Para comunicar um evento de acidente e reserva de vaga
 * schedule => Para ser usado pelo Scheduler
*/
var kafka = require('kafka-node');

module.exports = function (topic) {
    const client = new kafka.Client(process.env.ZOOKEEPER || 'stagihobd.hashtagsource.com');

    const producer = new kafka.HighLevelProducer(client);
    producer.on("ready", function () {
        producer.createTopics([topic], false, function (err, data) { }); //cria o topico assim que conectar no kafka
        console.log("Kafka Producer is connected on '" + topic + "' and ready.");
    });

    producer.on("error", function (err) {
        console.error(err);
    });

    //producer
    module.send = (data) => {
        var payload = [{
            topic: topic,
            messages: data
        }];

        producer.send(payload, function (err, data) {
            if (err) {
                console.log(err);
            }
        });
    };

    //consumer
    const consumer = new kafka.Consumer(client, [{ topic: topic, fromOffset: -1 }]); //consome sempre o ultimo topico
    module.consumer = consumer;

    return module;

}
