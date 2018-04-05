var express = require('express'),
app = express(),
port = process.env.PORT || 3000,
mongoose = require('mongoose'),
Message = require('./api/models/msgModel'),
bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://ts04:uqu7Shoo@ds127129.mlab.com:27129/stagihobd-ts04?3t.connectTimeout=10000&3t.uriVersion=2&3t.connectionMode=direct&3t.databases=stagihobd-ts04&readPreference=primary&3t.socketTimeout=0');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var routes = require('./api/routes/msgRoutes');
routes(app);
app.listen(port);
console.log('Message RESTful API server started on: ' + port);