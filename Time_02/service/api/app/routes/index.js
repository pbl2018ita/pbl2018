var express = require('express')

module.exports = function (app) {
  'use strict'
  var leitosHandlers = require('../controllers/leitos')
  
  app.get('/leitos', leitosHandlers.getLeitos) 

  app.post('/leitos', leitosHandlers.addLeitos) 
}
