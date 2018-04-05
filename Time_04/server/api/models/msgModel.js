'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var msgSchema = new Schema({
   title: {
      type: String
   },
   body: {
      type: String
   },
   Created_date: {
      type: Date,
      default: Date.now
   }
});
module.exports = mongoose.model('Messages', msgSchema);