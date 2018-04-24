var express = require('express');


module.exports = function (app) {
  'use strict'
  var indexHandlers = require('../controllers/index')
  var leitosHandlers = require('../controllers/leitos') //US108
  var recebimentoHandlers = require('../controllers/recebimento') //US109b
  var vitimaHandlers = require('../controllers/vitima'); //US109a
  var viewHandlers = require('../controllers/view'); //US109a
  var reservaHandlers = require('../controllers/reserva'); //US299b

  app.get('/', indexHandlers.index)
  app.get('/leitos', leitosHandlers.getLeitos) //US108
  app.get('/vitima', vitimaHandlers.getVitimas); //US109a
  app.get('/recebimento', recebimentoHandlers.getRecebimento) //US109b
  
  
  //US299b
  app.post('/reserva', reservaHandlers.newReservas); 
  app.get('/reserva', reservaHandlers.getReservas); 
  app.put('/reserva/:id/', reservaHandlers.updateReservas); 
  app.delete('/reserva/:id/', reservaHandlers.deleteReservas); 

  app.get('/view', viewHandlers.getInfos); //US299d
}