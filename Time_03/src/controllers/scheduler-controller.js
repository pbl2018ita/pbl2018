'use strict';

var DB = require('../models/scheduler-model');

exports.get = (req, res, next) => {
    try {
        //para permitir o correto direcionamento entre diretorios
        var path = require("path");

        //res.sendFile('/src/views/bryntum/index.html', { root: '.' });
        res.sendFile(path.join(__dirname, '/../views/bryntum/index.html'));
    } catch (err) {
        console.error(err);

        res.status(500).send({
            result: "fail"
        });
    }
};

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


