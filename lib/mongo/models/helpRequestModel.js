var mongoose = require('../../../db/mongoose')
var Schema = mongoose.Schema;

var helpRequestSchema = new Schema({
  title: String,
  passengerName: String,
  details: String,
  seatNumber: Number,
  seatLetter: String,
  completed: Boolean
})


module.exports = mongoose.model('HelpRequest', helpRequestSchema);
