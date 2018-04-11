var express = require('express');
var pacienteRouter = express.Router();

pacienteRouter.route('').get(function (req,res) {
         res.send('Exibindo a página principal...')});
         
         
module.exports = pacienteRouter; 