var express = require('express');
var router  = express.Router();
var mysql   = require('mysql');

var connection;
var pacienteData;
var ctrl;

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express Atendimento' });
});

router.get('/atendimento', function(req, res, next) {
  res.render('index', { title: 'Express Atendimento' });
});

// API para cadastrar médicos
router.post('/paciente', function(req, res) {

});

// API para cadastrar médicos
router.post('/medico', function(req, res) {

});

// API para buscar médicos
router.get('/medico', function(req, res) {

});

// API para cadastrar especialistas
router.post('/especialista', function(req, res) {

});

// API para buscar especialistas
router.get('/especialista', function(req, res) {

});