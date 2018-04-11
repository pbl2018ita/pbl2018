//'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var msgSchema = new Schema({
    from: String,
    to: String,
    content:{ patients:
                { patient:[
                        {
                            patientID: String,
                            firstName: String,
                            lastName: String,
                            email: String,
                            phones:{ phone:[{Home: String,Work: String}]},
                            city:String,
                            uf:String,
                            coordinates:{ coordinate:[{lat: String,long: String}]},
                            address:{street: String,number: String,zip: String}
                        }],
                        doctor:[{
                            physicianID:  String,
                            firstName: String,
                            lastName: String,
                            email: String,
                            phones:{ phone:[{Home : String,Work : String}]},
                            city:String,
                            uf:String,
                            coordinates:{coordinate:[{lat: String,long: String}]},
                            address:{street:String,number: String,zip: String}
                        }]
                }
            }
 });
 
module.exports = mongoose.model('Messages', msgSchema);