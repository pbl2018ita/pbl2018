'use strict'

const express = require('express');
const router = express.Router(); // criar um router

const controller = require('../controllers/map-controller');

module.exports = function (app) {
    //delego os metodos das rotas para os controllers
    router.get('/', controller.get);
    router.post('/', controller.post);
    //router.put('/:id', controller.put);
    //router.delete('/', controller.delete);
    return router;
};