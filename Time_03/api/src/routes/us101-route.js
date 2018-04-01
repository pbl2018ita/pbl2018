'use strict' 

const express = require('express');
const router = express.Router(); // criar um router

//post -> enviar informacoes
router.post('/', (req, res, next) => {
    res.status(201).send(req.body);
});

//put -> atualizar informacoes
router.put('/:id', (req, res, next) => {
    let id = req.params.id;
    res.status(201).send({
        id: id,
        item: req.body
    });
});

//delete
router.delete('/', (req, res, next) => {
    res.status(201).send(req.body);
});

module.exports = router;