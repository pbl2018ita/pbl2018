// config/initializers/database.js

var nconf = require('nconf')
var mongoose = require('mongoose')
var logger = require('winston')
require('../../app/models/leitos') // created model loading here

module.exports = function (cb) {
  'use strict'
  mongoose.Promise = global.Promise
  var dbConfig = nconf.get('database')
  var dbAuth = (dbConfig.user === '' && dbConfig.password === '') ? '' : dbConfig.user + ':' + dbConfig.password + '@'
  logger.info('[DATABASE] connecting to database')
  mongoose.connect('mongodb://' + dbAuth + dbConfig.server + ':' + dbConfig.port + '/' + dbConfig.name, function (error) {

    // Check error in initial connection. There is no 2nd param to the callback.
    if (!error) {
      logger.info('[DATABASE] connected')
      cb()
    } else {
      logger.info('[DATABASE] connection failed')
    }
  })
}
