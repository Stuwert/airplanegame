var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var articleSchema = new Schema({
  title: String,
  imageUrl: String,
  author: String,
  blurb: String,
  content: Array,
})

var Articles = mongoose.model('Articles', articleSchema);

module.exports =  Articles;
