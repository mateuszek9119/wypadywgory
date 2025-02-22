const mongoose = require('mongoose')
const Schema = mongoose.Schema

const newsSchema = new Schema({
  cityStart: { type: String, required: [true, "Pole 'Miejscowość startowa' nie może być puste !"] },
  cities: { type: String},
  cityEnd: { type: String, required: [true, "Pole 'Miejscowość docelowa' nie może być puste !"] },
  dateStartTransit :  { type: Date, required: [true, "Pole 'data wyjazdu' nie może być puste !"] },
  dateReturnTransit :  { type: Date, required: [true, "Pole 'data powrotu' nie może być puste !"] },
  user :  { type: String, required: [true, "Pole 'imię' nie może być puste !"] },
  img: {
    data: Buffer,
    contentType: String,
  },
  contact :  { type: String, required: [true, "Pole 'kontakt' nie może być puste !"] },
  description: { type: String },
  date: { type: Date, default: Date.now },
  citiesAll: { type: String},
});

module.exports = mongoose.model('News', newsSchema)

