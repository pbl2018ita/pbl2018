'use strict' 

const express = require('express');
const router = express.Router(); // criar um router

//get -> obter informacoes
router.get('/', (req, res, next) => {
    //200 -> OK
    //201 -> created
    //400 -> Bad request
    //401 -> nao autenticado
    //403 -> acesso negado
    //500 -> Internal server error
    res.status(200).send({
        title: "Node store api",
        version: "0.0.2"
    });
});

module.exports = router;