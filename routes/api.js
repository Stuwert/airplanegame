var express = require('express');
var router = express.Router();
var Movie = require('../lib/mongo/models/moviesModel')
var Article = require('../lib/mongo/models/articleModel')
var Food = require('../lib/mongo/models/foodModel')
var FlightInfo = require('../lib/mongo/models/flightInfoModel')

router.get("/movies", function(req, res){
  console.log('bing bong');
  Movie.find({}, function(err, movies){
    console.log(movies);
    if(err) throw err;

    res.json(movies)
  })
})

router.get("/movies/:title", function(req, res){
  Movie.find({title: req.params.title}, function(err, movie){
    if (err) throw err;

    res.json(movie[0])
  })
})

router.get("/articles", function(req, res){
  Article.find({}, function(err, articles){
    if(err) throw err;

    res.json(articles)
  })
})

router.get("/articles/:title", function(req, res){
  Article.find({title: req.params.title }, function(err, article){
    if(err) throw err;

    res.json(article[0])
  })
})

router.get("/food", function(req, res){
  Food.find({}, function(err, foods){
    if(err) throw err;

    res.json(foods)
  })
})

router.get("/food/:name", function(req, res){
  Article.findBydId({name: req.params.name}, function(err, food){
    if(err) throw err;

    res.json(food[0])
  })
})

router.get("/flightinfo", function(req, res){
  FlightInfo.find({}, function(err, flightInfo){
    if (err) throw err;

    res.json(flightInfo[0])
  })
})

module.exports = router;
