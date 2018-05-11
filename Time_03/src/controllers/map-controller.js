'use strict';

var gMaps = require('../services/GoogleMapsService');

//post -> enviar informacoes
exports.post = (req, res, next) => {
    gMaps.getDateFromGoogleMaps(req.body.origins,req.body.destinations)
        .asPromise()
        .then((response) => {
            res.status(201).send(response.json);
        })
        .catch((err) => {
            res.status(400).send(err);
        });

};

exports.get = (req, res, next) => {
    gMaps.getDateFromGoogleMaps(['-23.207905, -45.854510'],
        ['-23.198176, -45.915881', '-23.163200, -45.900261'])
        .asPromise()
        .then((response) => {
            res.status(201).send(response.json);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
};



