// config/initializers/server.js

var express = require('express')
var path = require('path')
// Local dependecies
var config = require('nconf')

// create the express app
// configure middlewares
var bodyParser = require('body-parser')
var morgan = require('morgan')
var logger = require('winston')


var app

var start = function (cb) {
  'use strict'
  // Configure express
  app = express()

  app.use(morgan('common'))

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }))

  // parse application/json
  app.use(bodyParser.json())


  logger.info('[SERVER] Initializing routes')
  require('../../app/routes/index')(app)

  app.use(express.static(path.join(__dirname, 'public')))

  // Error handler
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.json({
      message: err.message,
      error: (app.get('env') === 'development' ? err : {})
    })
    next(err)
  })

  app.use(function (req, res) {
    res.status(404).send({ url: req.originalUrl + ' not found' })
  })

  app.listen(process.env.PORT || config.get('NODE_PORT'))
  logger.info('[SERVER] Listening on port ' + config.get('NODE_PORT'))

  if (cb) {
    return cb()
  }
}

module.exports = start
