'use strict';

var key ='AIzaSyCQbgeeEd7gdy6mzNc2a6qHbfROHqDVuHw';
var link = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=&destinations=&key=';
var origin = '41.43206,-81.38992';
var destinations = '41.23206,-81.18992';

var ex = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=41.43206,-81.3899&destinations=41.23206,-81.18992&key=AIzaSyCQbgeeEd7gdy6mzNc2a6qHbfROHqDVuHw';


var googleMaps = require('@google/maps').createClient({
    key: 'AIzaSyCQbgeeEd7gdy6mzNc2a6qHbfROHqDVuHw',
    //Promise: require('q').Promise
  });
var myr = '';

//googleMaps.geocode({
//    address: '1600 Amphitheatre Parkway, Mountain View, CA'
//  }, function(err, response) {
//    if (!err) {
//        //res.status(201).send(response.json.results);
//        myr = response.json.results;
//    }
//    else{
//        myr = err;
//    }
//  });
  
googleMaps.distanceMatrix({
    origins: ['Hornsby Station, NSW', 'Chatswood Station, NSW'],
    destinations: ['Central Station, NSW', 'Parramatta Station, NSW'],
    //departure_time: new Date().getTime(),
    mode: 'driving',
    avoid: ['tolls', 'ferries'],
    traffic_model: 'best_guess'
  }  , function(err, response) {
        if (!err) {
            //res.status(201).send(response.json.results);
            //myr = response.json.results;
            myr = 123;
        }
        else{
            myr = err;
        }
      }) ;
  //.asPromise()
  //.then(expectOK)
  //.then(done, fail);


//post -> enviar informacoes
exports.post = (req, res, next) => {

 
    //  .asPromise()
    //  .then(expectOK)
    //  .then(done, fail);

      res.status(201).send(myr);
};


//put -> atualizar informacoes
exports.put = (req, res, next) => {
    let id = req.params.id;
    res.status(201).send({
        id: id,
        item: req.body
    });
};

//delete
exports.delete = (req, res, next) => {
    res.status(201).send(req.body);
};
