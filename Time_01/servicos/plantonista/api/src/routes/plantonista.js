'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/plantonista-controller');

router.get('/',controller.get);
router.get('/:codigo',controller.getById);
router.post('/',controller.post);
router.put('/:id',controller.put);
router.delete('/del/:codigo', controller.del);

module.exports = router;
