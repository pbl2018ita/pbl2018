'use strict' 

const express = require('express');
const router = express.Router();

const controller = require('../controllers/scheduler-controller');

const d__dirname = 'E:/Projetos/pbl2018/Time_03/api/src/views/bryntum';


module.exports = function(app) {
   //envio de conteudo statico (CSS, Image, HTML, JS, etc.)
	app.use(express.static(d__dirname));
    
	router.get('/', controller.get);
	//router.post('/', controller.post);
	//router.put('/:id', controller.put);
	//router.delete('/', controller.delete);
	return router;
};