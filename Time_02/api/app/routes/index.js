var express = require('express')

module.exports = function (app) {
  'use strict'
  var leitosHandlers = require('../controllers/leitos')
  var indexHandlers = require('../controllers/index')
  
  app.get('/', indexHandlers.index) 
  app.get('/leitos', leitosHandlers.getLeitos)
  
}
