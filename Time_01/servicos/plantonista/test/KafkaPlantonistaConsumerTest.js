var kafka = require('kafka-node');
var Consumer = kafka.Consumer,

client = new kafka.Client("stagihobd.hashtagsource.com:2181"), //9092 //2181
consumer = new Consumer(
    client, [ { topic: 'teste123' } ], { autoCommit: true });
    //client, [ { topic: 'cross', partition: 0 } ], { autoCommit: true });

    console.log("tentando conexão...");

consumer.on("ready", function () {
    console.log("Kafka Producer is connected on '" + topic + "' and ready.");
});

consumer.on("error", function (err) {
    console.error(err);
});

consumer.on('message', function (message) {
    //var data = JSON.parse(message.value);

    console.log(message.value + "\n\n");
});
