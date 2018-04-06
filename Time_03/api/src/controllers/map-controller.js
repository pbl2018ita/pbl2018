'use strict';

var key = 'AIzaSyCQbgeeEd7gdy6mzNc2a6qHbfROHqDVuHw';
var googleMaps = require('@google/maps').createClient({ key: key, Promise: Promise });

function getDateFromGoogleMaps(origins, destinations) {
    return googleMaps.distanceMatrix({
        origins: origins,
        destinations: destinations,
        departure_time: new Date().getTime(),
        mode: 'driving',
        avoid: ['tolls', 'ferries'],
        traffic_model: 'best_guess'
    });
}



exports.get = (req, res, next) => {
    getDateFromGoogleMaps(['-23.207905, -45.854510'],
        ['-23.198176, -45.915881', '-23.163200, -45.900261'])
        .asPromise()
        .then((response) => {
            res.status(201).send(response.json);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
};

//post -> enviar informacoes
exports.post = (req, res, next) => {
    //res.status(201).send(req.body.origins) 
    getDateFromGoogleMaps(req.body.origins,req.body.destinations)
        .asPromise()
        .then((response) => {
            res.status(201).send(response.json);
        })
        .catch((err) => {
            res.status(400).send(err);
        });

};


