var mongoose = require('../../../db/mongoose')
var Schema = mongoose.Schema;


var orderSchema = new Schema({
  passengerName: String,
  completed: Boolean,
  items: Array,
  seatNumber: Number,
  seatLetter: String
})

module.exports = mongoose.model('Order', orderSchema);
