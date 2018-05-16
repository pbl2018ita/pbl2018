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
  app.post('/leito/reserva', reservaHandlers.newReserva);
  app.get('/leito/reserva', reservaHandlers.getReservas);
  app.put('/leito/reserva/:id/', reservaHandlers.updateReserva);
  app.delete('/leito/reserva/:id/', reservaHandlers.deleteReserva);
  app.get('/leito/reserva/confirmar/:id/', reservaHandlers.confReserva);

  app.get('/view/leito', viewHandlers.getLeitosView); //US299d
  app.get('/view/reserva', viewHandlers.getReservaView); //US299d
  app.get('/view/especialista', viewHandlers.getEspecialistaView); //US299d
  app.get('/view/plantonista', viewHandlers.getPlantonistaView); //US299d

}
