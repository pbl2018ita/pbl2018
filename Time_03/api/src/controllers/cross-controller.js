'use strict';

var io = require('../io.controllers/cross-io');

//post -> enviar informacoes
exports.post = (req, res, next) => {
    try {
        //io.send(JSON.stringify(req.body));

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
        var path = require("path");
        res.sendFile(path.join(__dirname, '/../views/cross.index.html'));
    } catch (err) {
        console.error(err);
        
        res.status(500).send({
            result: "fail"
        });
    }
};
