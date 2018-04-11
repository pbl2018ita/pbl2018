'use strict' 

const express = require('express');
const router = express.Router(); // criar um router

const controller = require('../controllers/kafka-controller');


//delego os metodos das rotas para os controllers
router.get('/', controller.get);
router.post('/', controller.post);

module.exports = router;