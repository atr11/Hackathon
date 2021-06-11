require('./db')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  cityname: String,
  type: String,
  description: String,
  lat: Number,
  lng: Number
});

module.exports = mongoose.model('Location', locationSchema, 'locations');