var createError = require('http-errors');
var express = require('express');
var path = require('path');

var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter                   = require('./routes/index');
var pacienteRouter                = require('./routes/paciente');
var atendimentoParticipanteRouter = require('./routes/atendimento-participantes');
var atendimentoAutorizarRouter    = require('./routes/atendimento-autorizar');
var atendimentoRealizarRouter     = require('./routes/atendimento-realizar');
var atendimentoRegistrarRouter    = require('./routes/atendimento-registrar');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', pacienteRouter);
console.log('Serviço PACIENTE iniciado.');

app.use('/api', atendimentoParticipanteRouter);
console.log('Serviço ATENDIMENTO-HOSPITAL iniciado.');
console.log('Serviço ATENDIMENTO-MEDICO iniciado.');
console.log('Serviço ATENDIMENTO-ESPECIALISTA iniciado.');

app.use('/api', atendimentoAutorizarRouter);
console.log('Serviço ATENDIMENTO-HOSPITAL-AUTORIZACAO iniciado.');

app.use('/api', atendimentoRealizarRouter);
console.log('Serviço ATENDIMENTO-REALIZAR iniciado.');

app.use('/api', atendimentoRegistrarRouter);
console.log('Serviço ATENDIMENTO-PRONTUARIO iniciado.');

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
