'use strict';

var DB = require('../models/scheduler-model');

const app = require('express')();
const http = require('http');
const server = http.createServer(app);

const io = require('socket.io').listen(server);
io.sockets.on('connection', function (client) {

    
});

exports.get = (req, res, next) => {
	//para permitir o correto direcionamento entre diretorios
	var path = require("path");

    //res.sendFile('/src/views/bryntum/index.html', { root: '.' });
    res.sendFile(path.join(__dirname, '/../views/bryntum/index.html'));
};

exports.get1 = function (router, app) {
    //
    //
    //const io = require('socket.io').listen(server);

    router.get('/', function(req, res){
        var path = require("path");

        //res.sendFile('/src/views/bryntum/index.html', { root: '.' });
        res.sendFile(path.join(__dirname, '/../views/bryntum/index.html'));
    });



    //var path = require("path");

    //res.sendFile('/src/views/bryntum/index.html', { root: '.' });
    //res.sendFile(path.join(__dirname, '/../views/bryntum/index.html'));

    return router;
}



