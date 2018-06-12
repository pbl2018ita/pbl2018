'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/plantonista-reserva-controller');

// Reserva

console.log("routes-plantonista-reserva: " + controller.post);

router.get('/',controller.get);
router.get('/:codigo',controller.getById);
router.get('/plantonista-reserva-status',controller.get);
router.post('/',controller.post);
router.put('/confirmar/:crm',controller.put);

module.exports = router;
