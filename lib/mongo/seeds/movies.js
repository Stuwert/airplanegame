var mongoose = require('../../../db/mongoose')
var Movie = require('../models/moviesModel')

var moviesArray = [
  new Movie({
    title: 'Apollo 13',
    price: 0,
    runTime: 140,
    blurb: 'NASA must devise a strategy to return Apollo 13 to Earth safely after the spacecraft undergoes massive internal damage putting the lives of the three astronauts on board in jeopardy.',
    imageUrl: 'images/apollo13.png',
    actors: [
      'Tom Hanks',
      'Bill Paxton',
      'Kevin Bacon'
    ],
    releaseYear: 1995,
    genre: 'Adventure'
  }),
  new Movie({
    title: 'Inside Out',
    price: 2.99,
    runTime: 95,
    blurb: 'After young Riley is uprooted from her Midwest life, and moved to San Francisco, her emotions - Joy, Fear, Anger, Disgust, and Sadness - conflict on how best to navigate a new city, house, and school',
    imageUrl: 'images/insideout.png',
    actors: [
      'Amy Poehler',
      'Bill Hader',
      'Lewis Black'
    ],
    releaseYear: 2015,
    genre: 'comedy'
  }),
  new Movie({
    title: 'Rogue One',
    'price': 5.99,
    runTime: 120,
    blurb: 'Rebels set out on a mission to steal the plans for the Death Star.',
    imageUrl: 'images/rogueone.png',
    actors: [
      'Felicity Jones',
      'Mads Mikkelsen',
      'Allan Tudyk'
    ],
    releaseYear: 2016,
    genre: 'Sci-Fi'
  }),
  new Movie({
    title: 'Captain America: Civil War',
    price: 5.99,
    runTime: 146,
    blurb: 'Political interference in the Avengers\' activities causes a rift between former allies Captain America and Iron Man.',
    imageUrl: 'images/captainamerica.png',
    actors: [
      'Tom Holland',
      'Scarlett Johansson',
      'Elizabeth Olsen'
    ],
    releaseYear: 2016,
    genre: 'Adventure'
  }),
  new Movie({
    title: 'Eye in the Sky',
    price: 5.99,
    runTime: 102,
    blurb: 'Col. Katherine Powell, a military officer in command of an operation to capture terrorists in Kenya, sees her mission escalate when a girl enters the kill zone triggering an international dispute over the implications of modern warfare.',
    imageUrl: 'images/eyesky.png',
    actors: [
      'Helen Mirren',
      'Aaron Paul',
      'Alan Rickman'
    ],
    releaseYear: 2015,
    genre: 'Drama'
  }),
  new Movie({
    title: 'My Big Fat Greek Wedding 2',
    price: 0,
    runTime: 94,
    blurb: 'A Portokalos family secret brings the beloved characters back together for an even bigger and Greeker wedding.',
    imageUrl: 'images/greekwedding.png',
    actors: [
      'Nia Vardalos',
      'John Corbett',
      'Michael Constantine'
    ],
    releaseYear: 2016,
    genre: 'Romantic Comedy'
  })
]

moviesArray.forEach(function(moviz, i){
  moviz.save(function(err, movie){
    if(err) throw err;

    console.log("Movie " + i + " saved!")
  })
})
