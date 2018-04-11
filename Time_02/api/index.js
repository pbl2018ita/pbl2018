// index.js
'use strict'

var server = require('./config/initializers/server')
var nconf = require('nconf')
var async = require('async')
var logger = require('winston')

// Load Environment variables from .env file
require('dotenv').config({path:__dirname+'/process.env'})

// Set up configs
nconf.use('memory')

// First load command line arguments
nconf.argv()

// Load config file for the environment
require('./config/environments/' + process.env.NODE_ENV+'.js')

logger.info('[APP] Starting server initialization')

// Initialize Modules
async.series([
  function initializeDBConnection (callback) {
    logger.info('[DATABASE] Starting database initialization')
    require('./config/initializers/database')(callback)
  },
  function startServer (callback) {
    server(callback)
  }], function (err) {
    if (err) {
      logger.error('[APP] initialization failed', err)
    } else {
      logger.info('[APP] initialized SUCCESSFULLY')
    }
  })
