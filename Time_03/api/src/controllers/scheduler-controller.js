'use strict';

var io = require('../io.controllers/scheduler-io');

//post -> enviar informacoes
exports.post = (req, res, next) => {
    try {
        io.send(JSON.stringify(req.body));

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




