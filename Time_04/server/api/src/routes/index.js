'use strict'

const express = require('express');
const router = express.Router();


var route = router.get('/', (req, res, next) => {
    res.status(200).send({
        title: "STAGIHO-BD",
        version : "0.0.1"
    });
});

module.exports = router;