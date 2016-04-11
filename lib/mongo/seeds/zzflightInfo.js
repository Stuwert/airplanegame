require('dotenv').load()
var mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL)
var User = require('../models/flightInfoModel')

var user = new User({
    departureCity: 'Seattle',
    departureAirport: 'SEA',
    destinationCity: 'Denver',
    destinationAirport: 'DEN',
    departureTime: new Date(2016, 3, 8, 3, 12, 0),
    estimatedArrivalTime: new Date(2016, 3, 8, 6, 32, 0),
    milesFlown: 889,
    aircraftType: 'A320',
    flightNumber: 1234
  })

user.save(function(err, uzer){
  if (err) throw err

  console.log("Saved!")
})
