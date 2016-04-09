var express = require('express');
var router = express.Router();
var mongoose = require('./lib/mongo/dbGetCalls')


router.get("/movies", function(req, res){
  // mongoose.getAllMovies(function(err, movies){
  //   res.json(movies);
  // })
})

router.get("/movies/:id", function(req, res){
  // mongoose.getOneMovie(req.params.id, function(err, movie){
  //   res.json(movie)
  // })
})

router.get("/articles", function(req, res){
  // mongoose.getAllArticles(function(err, articles){
  // res.json(articles)
  // });
})

router.get("/articles/:id", function(req, res){
  // mongoose.getOneArticle(req.params.id, function(err, article){
  // res.json(article)
  // })
})

router.get("/food", function(req, res){
  // mongoose.getAllFood(function(err, food){
  //   res.json(food)
  // })
})

router.get("/food/:id", function(req, res){
  // mongoose.getOneFood(req.params.id, function(err, food){
  //   res.json(food)
  // })
})

router.get("/flightinfo", function(req, res){
  // mongoose.getFlightInfo({}, function(err, info){
  //   res.json(info)
  // })
})

module.exports = router;
