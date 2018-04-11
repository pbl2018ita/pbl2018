'use strict'

const express = require('express');
const router = express.Router();
const controller = require('../controllers/acidente-controller');


router.get('/',controller.get);
router.get('/:codigo',controller.getById);
router.post('/',controller.post);
router.put('/:id',controller.put);

module.exports = router;