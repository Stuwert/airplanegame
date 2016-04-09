var mongoose = require('../../../db/mongoose')
var HelpRequest = require('../models/helprequestModel')

var helpArray = [
  new HelpRequest({
    title: 'I need water',
    passengerName: 'John Smith',
    details: 'I need water',
    seatNumber: 30,
    seatLetter: 'C',
    completed: false
  }),
  new HelpRequest({
    title: 'There is a whiny baby next to me',
    passengerName: 'Pocahontas',
    details: 'I would like it to be quiet',
    seatNumber: 10,
    seatLetter: 'A',
    completed: true
  })
]

helpArray.forEach(function(helpz, i){
  helpz.save(function(err, help){
    if(err) throw err;

    console.log("Help " + i + " saved!")
  })
})
