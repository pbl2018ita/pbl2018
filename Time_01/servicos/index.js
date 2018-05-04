var express = require('express');
var routes = require('./routes/routes')
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use(routes);

//retorno de erro para o usuario
app.use(function(err, req, res, next){
    res.send({error:err.message});
});

mongoose.connect("mongodb://ts01:zi7EezaW@ds127129.mlab.com:27129/stagihobd-ts01");
mongoose.Promise = global.Promise;

app.listen(process.env.PORT || 9000, function(){
    console.log("Aguardando requests");
});
