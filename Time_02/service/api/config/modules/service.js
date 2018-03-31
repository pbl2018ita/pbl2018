// /service.js
'use strict'

// initialize service modules
var nconf = require('nconf')
var async = require('async')
var logger = require('winston')
var mongoose = require('mongoose')
var NotifiedEvents = mongoose.model('NotifiedEvent')
var conf = require('../initializers/config')
var utils = require('../initializers/utils')
var fcm = nconf.get('fcm')


module.exports = {
  run: function (cb) {
    logger.add(logger.transports.File, { filename: 'service.log' })
    logger.info('[SERVICE] Starting notification service')

    if (cb) {
      return cb()
    }
  },
}