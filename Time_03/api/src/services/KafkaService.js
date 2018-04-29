'use strict'

const kafka = require('kafka-node');
const client = new kafka.Client(process.env.ZOOKEEPER || 'stagihobd.hashtagsource.com:2181');

module.exports = module = function (topic) {
    //analisar quais topicos devem existir no sistema. ex: cross, hospital_a, hospital_b, hospital_c
    //topic = process.env.TOPIC || "cross";

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
        const payload = [{
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
