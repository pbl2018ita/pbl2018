'use strict';

var key = 'AIzaSyCQbgeeEd7gdy6mzNc2a6qHbfROHqDVuHw';
var googleMaps = require('@google/maps').createClient({ key: key, Promise: Promise });


exports.getDateFromGoogleMaps = function (origins, destinations) {
    return googleMaps.distanceMatrix({
        origins: origins,
        destinations: destinations,
        departure_time: new Date().getTime(),
        mode: 'driving',
        avoid: ['tolls', 'ferries'],
        traffic_model: 'best_guess'
    });
}
