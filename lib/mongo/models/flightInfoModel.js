var mongoose = require('../../../db/mongoose')
var Schema = mongoose.Schema;


var flightInfoSchema = new Schema({
  departureCity: String,
  departureAirport: String,
  destinationCity: String,
  destinationAirport: String,
  departureTime: Date,
  estimatedArrivalTime: Date,
  milesFlown: Number,
  aircraftType: String,
  flightNumber: Number
})

module.exports = mongoose.model('FlightInfo', flightInfoSchema);
