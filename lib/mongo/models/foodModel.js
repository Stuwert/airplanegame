var mongoose = require('mongoose')
var Schema = mongoose.Schema;


var foodSchema = new Schema({
  name: String,
  price: Number,
  imageUrl: String,
  calories: Number,
  contents: Array,
  vegetarian: Boolean,
  glutenFree: Boolean,
  vegan: Boolean
})

module.exports = mongoose.model('Food', foodSchema);
