var express = require('express')

module.exports = function (app) {
  'use strict'
  var indexHandlers = require('../controllers/index')
  var leitosHandlers = require('../controllers/leitos') //US108
  var patientsReceiptHandlers = require('../controllers/patients_receipt') //US109b
  
  app.get('/', indexHandlers.index) 
  app.get('/leitos', leitosHandlers.getLeitos) //US108
  app.post('/patients_receipt', patientsReceiptHandlers.getPatientsReceipt) //US109b
}

