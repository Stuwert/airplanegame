var mongoose = require('../../../db/mongoose')
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
  email: String
})

var User = mongoose.model('User', userSchema);

module.exports = User;
