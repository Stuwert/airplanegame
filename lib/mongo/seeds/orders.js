var mongoose = require('../../../db/mongoose')
var Order = require('../models/orderModel')

var orderArray = [
  new Order({
    passengerName: 'Samantha',
    completed: false,
    items: [
      'Sliders',
      'Kettle Corn'
    ],
    seatNumber: 22,
    seatLetter: 'B'
  }),
  new Order({
    passengerName: 'Billy',
    completed: true,
    items: [
      'Hummus and Pita'
    ],
    seatNumber: 2,
    seatLetter : 'A'
  })
]


orderArray.forEach(function(orderz, i){
  orderz.save(function(err, order){
    if(err) throw err;

    console.log("Order " + i + " saved!")
  })
})
