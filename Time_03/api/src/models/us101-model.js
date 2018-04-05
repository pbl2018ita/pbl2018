'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const mySchema = new Schema({
    //o Schema cria automaticamente um _id do tipo GUID
    hospital: { type: String, required: true, trim: true },
    slug: { type: String, required: true, trim: true, index: true, unique: true },
    valor: { type: Number, required: true },
    status: { type: Boolean, required: true, default: true },
    tags: [{ type: String, required: true}],
});

module.exports = mongoose.model('Us101', mySchema);