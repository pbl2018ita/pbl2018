'use strict';

var DB = require('../models/scheduler-model');

exports.get = (req, res, next) => {
	//para permitir o correto direcionamento entre diretorios
	var path = require("path");

    //res.sendFile('/src/views/bryntum/index.html', { root: '.' });
    res.sendFile(path.join(__dirname, '/../views/bryntum/index.html'));
};




