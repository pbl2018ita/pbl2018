'use strict';
var mongoose = require('mongoose'),
Message = mongoose.model('Messages');
exports.list_all_messages = function(req, res) {
   Message.find({}, function(err, msg) {
      if (err)
      res.send(err);
      res.json({
        "from":"hc",
        "to":"cross",
        "content":{
           "patients":{
              "patient":[
                 {
                    "patientID":1,
                    "firstName":"Mary",
                    "lastName":"Lee",
                    "email":"mary.lee@gmail.com",
                    "phones":{
                       "phone":[
                          {
                             "(12) 99876-5432":"Home",
                             "(12) 99876-5435":"Work"
                          }
                       ]
                    },
                    "city":"São Paulo",
                    "uf":"SP",
                    "coordinates":{
                       "coordinate":[
                          {
                             "lat":"-23.543059",
                             "long":"-46.645211"
                          }
                       ]
                    },
                    "address":{
                       "street":"Rua José da Silva",
                       "number":"100",
                       "zip":"11222-999"
                    }
                 }
              ],
              "doctor":[
                 {
                    "physicianID":1,
                    "firstName":"Ann",
                    "lastName":"Smith",
                    "email":"ann.smith@gmail.com",
                    "phones":{
                       "phone":[
                          {
                             "(12) 99876-5432":"Home",
                             "(12) 99876-5435":"Work"
                          }
                       ]
                    },
                    "city":"São Paulo",
                    "uf":"SP",
                    "coordinates":{
                       "coordinate":[
                          {
                             "lat":"-23.543059",
                             "long":"-46.645211"
                          }
                       ]
                    },
                    "address":{
                       "street":"Rua José da Silva",
                       "number":"100",
                       "zip":"11222-999"
                    }
                 }
              ]
           }
        }
     });
   });
};
exports.create_a_message = function(req, res) {
   var new_msg = new Message(req.body);
   new_msg.save(function(err, msg) {
   if (err)
      res.send(err);
   res.json(msg);
   });
};
exports.read_a_message = function(req, res) {
   Message.findById(req.params.msgId, function(err, msg) {
   if (err)
      res.send(err);
   res.json(msg);
   });
};
exports.update_a_message = function(req, res) {
   Message.findOneAndUpdate({_id: req.params.msgId}, req.body, {new: true}, function(err, msg) {
   if (err)
      res.send(err);
   res.json(msg);
   });
};
exports.delete_a_message = function(req, res) {
   Message.remove({
      _id: req.params.msgId
   }, function(err, msg) {
   if (err)
      res.send(err);
   res.json({ message: 'Message successfully deleted' });
   });
};