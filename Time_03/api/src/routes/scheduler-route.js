'use strict' 

const express = require('express');
const router = express.Router();
const controller = require('../controllers/scheduler-controller');

module.exports = function(app) {
	//para permitir o correto direcionamento entre diretorios
	var path = require("path");

   //envio de conteudo statico (CSS, Image, HTML, JS, etc.)
	app.use('/scheduler', express.static(path.join(__dirname, '/../views/bryntum')));

	//router => controller.get1(router, app);

	router.get('/', controller.get);
	router.post('/', controller.post);
	router.get('/res', controller.resource);
	router.get('/reservas', controller.reservas);
	//router.put('/:id', controller.put);
	//router.delete('/', controller.delete);
	return router;
};	