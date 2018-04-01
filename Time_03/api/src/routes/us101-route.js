'use strict' 

const express = require('express');
const router = express.Router(); // criar um router

const controller = require('../controllers/us101-controller');

//delego os metodos das rotas para os controllers
router.post('/', controller.post);
router.put('/:id', controller.put);
router.delete('/', controller.delete);

module.exports = router;