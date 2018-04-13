'use strict';

var kafka = require('../services/KafkaService');

//post -> enviar informacoes
exports.post = (req, res, next) => {
    try {
        kafka.send(JSON.stringify(req.body));

        res.status(200).send({
            result: "ok"
        });
    } catch (err) {
    	console.error(err);
    	
        res.status(500).send({
            result: "fail"
        });
    }
};

//get -> enviar informacoes
exports.get = (req, res, next) => {
    try {
        //tem como melhorar isto aqui
        res.sendFile('/app/src/views/cross.index.html');
    } catch (err) {
        console.error(err);
        
        res.status(500).send({
            result: "fail"
        });
    }
};
