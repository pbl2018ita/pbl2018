var express = require('express');
var routes = require('./routes/routes')
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());
app.use('/api', routes);

//retorna erro para usuario, quando ocorrer
app.use(function(err, req, res, next){
    //console.log(err);
    res.send({error: err.message});
});

//conectar ao MongoDB
mongoose.connect("mongodb://ts01:zi7EezaW@ds127129.mlab.com:27129/stagihobd-ts01");
mongoose.Promise = global.Promise;

/*app.get('/', function(req, res){
    console.log('Usuario conectado');
    res.send({name: 'Teste especialistas'});
});*/

app.listen(process.env.PORT || 9000, function(){
    console.log('Aguardando requests');
});
