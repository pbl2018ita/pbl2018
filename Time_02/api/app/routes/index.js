var express = require('express');

module.exports = function (app) {
  'use strict'
  var indexHandlers = require('../controllers/index')
  var leitosHandlers = require('../controllers/leitos') //US108
  var recebimentoHandlers = require('../controllers/recebimento') //US109b
  var vitimaHandlers = require('../controllers/vitima'); //US109a

  app.get('/', indexHandlers.index)
  app.get('/leitos', leitosHandlers.getLeitos) //US108
  app.get('/recebimento', recebimentoHandlers.getRecebimento) //US109b
  app.get('/vitima', vitimaHandlers.getVitimas); //US109a
}
