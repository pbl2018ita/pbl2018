'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/transporte-controller');


router.get('/',controller.get);
router.get('/:registro',controller.getById);
router.post('/',controller.post);
router.put('/:id',controller.put);

module.exports = router;