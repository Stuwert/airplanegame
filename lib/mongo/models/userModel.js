var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var userSchema = new Schema({
  name: String,
  milesNumber:  String,
  jwt: String,
  milesEarned: Number,
  seatNumber: Number,
  seatLetter: String,
  games: Array,
  movies: Array,
  magazine: Array,
  food: Array,
  email: String,
  status: String,
  authorization: Boolean
})

var User = mongoose.model('User', userSchema);

module.exports = User;
