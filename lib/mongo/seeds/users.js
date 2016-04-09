var mongoose = require('../../../db/mongoose')
var User = require('../models/userModel')

var user = new User({
    'name': 'John Smith',
    'milesNumber':  '030492094',
    'jwt': null,
    'milesEarned': 2000,
    'seatNumber': 15,
    'seatLetter' : 'E',
    'games': null,
    'movies': null,
    'magazine': null
  })

user.save(function(err, uzer){
  if (err) throw err

  console.log("Saved!")
})
