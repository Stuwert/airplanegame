var express = require('express');
var router = express.Router();
var Movie = require('../lib/mongo/models/moviesModel')
var Article = require('../lib/mongo/models/articleModel')
var Food = require('../lib/mongo/models/foodModel')
var FlightInfo = require('../lib/mongo/models/flightInfoModel')

router.get("/movies", function(req, res){
  Movie.find({}, function(err, movies){
    if(err) throw err;

    res.json(movies)
  })
})

router.get("/movies/:id", function(req, res){
  Movie.findById(req.params.id, function(err, movie){
    if (err) throw err;

    res.json(movie)
  })
})

router.get("/articles", function(req, res){
  Article.find({}, function(err, articles){
    if(err) throw err;

    res.json(articles)
  })
})

router.get("/articles/:id", function(req, res){
  Article.findBydId(req.params.id, function(err, article){
    if(err) throw err;

    res.json(article)
  })
})

router.get("/food", function(req, res){
  Article.find({}, function(err, foods){
    if(err) throw err;

    res.json(foods)
  })
})

router.get("/food/:id", function(req, res){
  Article.findBydId(req.params.id, function(err, food){
    if(err) throw err;

    res.json(food)
  })
})

router.get("/flightinfo", function(req, res){
  FlightInfo.find({}, function(err, flightInfo){
    if (err) throw err;

    res.json(flightInfo)
  })
})

module.exports = router;
