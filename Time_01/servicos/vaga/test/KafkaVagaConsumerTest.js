var kafka = require('kafka-node');
var Consumer = kafka.Consumer,

client = new kafka.Client("stagihobd.hashtagsource.com:2181"),
consumer = new Consumer(
    client, [ { topic: 'cross' } ], { autoCommit: false });
    //client, [ { topic: 'cross', partition: 0 } ], { autoCommit: false });

    console.log("tentando conexão...");

consumer.on('message', function (message) {
    //var data = JSON.parse(message.value);
    console.log(message.value + "\n\n");
});
