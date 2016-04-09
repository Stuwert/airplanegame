var mongoose = require('../../../db/mongoose')
var Schema = mongoose.Schema;

var moviesSchema = new Schema({
  title: String,
  price: Number,
  runTime: Number,
  blurb: String,
  imageUrl: String,
  actors: Array,
  releaseYear: Number,
  genre: String
})

module.exports = mongoose.model('Movies', moviesSchema)
