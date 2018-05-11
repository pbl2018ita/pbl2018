'use strict' 

const express = require('express');
const router = express.Router();

//200 -> OK
//201 -> created
//400 -> Bad request
//401 -> nao autenticado
//403 -> acesso negado
//500 -> Internal server error
module.exports = function(app) {
    router.get('/', (req, res, next) => {
        res.status(200).send({
            title: "Application STAGIHO-BD TS03",
            version: process.env.VERSION
        });
    });

    return router;
};

