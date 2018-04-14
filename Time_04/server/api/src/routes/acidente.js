'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/acidente-controller');


router.get('/',controller.get);
router.get('/:codigo',controller.getById);
router.get('/transportes/registro/:transporte',controller.getTransportes);
router.get('/transportes/tipo/:transporte_tipo',controller.getTransportesTipo);
router.get('/ocorrencia/:ocorrencia',controller.getOcorrencia);
router.post('/',controller.post);
router.put('/:id',controller.put);

module.exports = router;