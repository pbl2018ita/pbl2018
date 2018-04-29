'use strict';

module.exports = function (io) {
    const topic = "schedule";
    const kafka = require('../services/KafkaService')(topic);

    io.sockets.on('connection', function (client) {
        client.on('toServer', function (message) {
            kafka.send(JSON.stringify(message));
        });

        kafka.consumer.on('message', function (message) {
    
        });
    })
}