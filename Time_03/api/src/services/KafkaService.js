'use strict'

/* Informe o topic que deseja manipular */

module.exports = module = function (topic) {
    const kafka = require('kafka-node');
    const client = new kafka.Client(process.env.ZOOKEEPER || 'stagihobd.hashtagsource.com:2181');

    const producer = new kafka.HighLevelProducer(client);
    producer.on("ready", function () {
        producer.createTopics([topic], false, function (err, data) { }); //cria o topico assim que conectar no kafka

        console.log("Kafka Producer is connected on '" + topic + "' and ready.");
    });

    producer.on("error", function (err) {
        console.error(err);
    });

    //producer
    module.send = (data, topic) => {
        const payload = [{
            topic: topic,
            messages: data
        }];

        //console.log(payload)

        producer.send(payload, function (err, data) {
            if (err) {
                console.log(err);
            }
        });
    };

    //module.kafkaLib = kafka;

    //consumer
    const consumer = new kafka.Consumer(client, [{ topic: topic, fromOffset: -1 }]); //consome sempre o ultimo topico
    module.consumer = consumer;

    module.consume2r = (topic) => {
        var c = kafka.Consumer(client, [{ topic: topic, fromOffset: -1 }]); //consome sempre o ultimo topico
        return c;
    }

    module.myConsumer = (topic) => {

        var c = new kafka.Consumer(client, [{ topic: topic, fromOffset: -1 }]); //consome sempre o ultimo topico

        return c.on('message', function (message) { return client});
        //console.log(topic)
        //return  new kafka.Consumer(client, [{ topic: topic, fromOffset: -1 }]); //consome sempre o ultimo topico
    }

    return module;

}
