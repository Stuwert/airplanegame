var mongoose = require('../../../db/mongoose')
var Food = require('../models/foodModel')

var foodArray = [
  new Food({
    name: 'Hummus and Pita',
    price: 5.99,
    imageUrl: 'images/hummuspita.png',
    calories: 300,
    contents: [
      'hummus',
      'celery',
      'pita'
    ],
    vegetarian: true,
    glutenFree: false,
    vegan: true
  }),
  new Food({
    name: 'Sliders',
    price: 10.99,
    imageUrl: 'images/sliders.png',
    calories: 800,
    contents: [
      'beef',
      'bread',
      'mustard'
    ],
    vegetarian: false,
    glutenFree: false,
    vegan: false
  }),
  new Food({
    name: 'Tapas',
    price: 8.99,
    imageUrl: 'images/tapas.png',
    calories: 500,
    contents: [
      'olives',
      'nuts',
      'fig'
    ],
    vegetarian: false,
    glutenFree: true,
    vegan: false
  })
]


foodArray.forEach(function(foodZ, i){
  foodZ.save(function(err, food){
    if(err) throw err;

    console.log('Food ' + i + ' saved succesfully!')
  })
})
