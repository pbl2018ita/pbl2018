'use strict' //forca o javascript ser mais criterioso, para falhar compilacao

const express = require('express');

const app = express(); //Cria aplicacao

const router = express.Router(); // criar um router

const route = router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "Node store api",
        version: "0.0.2"
    });
});

app.use('/', route);

module.exports = app;