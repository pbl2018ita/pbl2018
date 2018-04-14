'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/paciente-controller');


router.get('/',controller.get);
router.get('/:docto_cpf',controller.getById);
router.get('/ocorrencias/:ocorrencias',controller.getOcorrencias);
router.post('/',controller.post);
router.put('/:id',controller.put);

module.exports = router;