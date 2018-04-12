'use strict';

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const { Kafka } = require('kafkajs')
const topic = 'teste';

// Create the client with the broker list
const kafka = new Kafka({
    clientId: 'my-app',
    brokers: ['stagihobd.hashtagsource.com:9092', 'stagihobd.hashtagsource.com:2181'],
    //connectionTimeout: 3000
})

exports.post = (req, res, next) => {
    const producer = kafka.producer();

    producer.connect()
    producer.send({
        topic: req.body.topic,
        messages: [
            { key: 'key1', value: JSON.stringify(req.body.message) }
        ],
    });

    // before you exit your app
    producer.disconnect();
    res.status(201).send('OK');

};

exports.get = (req, res, next) => {
    const consumer = kafka.consumer({ groupId: '' });

    consumer.connect();

    // Subscribe can be called several times
    consumer.subscribe({ topic: topic, fromBeginning: true });

    // It's possible to start from the beginning:
    // await consumer.subscribe({ topic: 'topic-name', fromBeginning: true })
    //console.log(consumer);
    consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
            console.log({
                key: message.key.toString(),
                value: message.value.toString()
            })
        },
    })

    // before you exit your app
    consumer.disconnect();

    res.status(201).send('OK');

};


io.on('connection', function (socket) {
    console.log('a user connected');
});

//http.listen(8091, function () {
//    console.log('listening on *:8091');
//});