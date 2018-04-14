'use strict'

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB || 'mongodb://ts03:OhFaiy2u@ds127589.mlab.com:27589/stagihobd-ts03');