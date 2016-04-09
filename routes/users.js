var express = require('express');
var router = express.Router();
var mongoosePosts = require('./lib/mongo/dbPostCalls')
var mongooseGets = require('./lib/mongo/dbGetCalls')

//Needs middleware to validate that this is ok.

router.post('/movies', function(req, res){
// gets object of movie title, image
// saves to user movies array
})

router.post('/articles', function(req, res){
  // gets object of article title, blurb, author
  // saves to user articles array
})

router.post('/food', function(req, res){
  //gets object of food name, price, calories
  //saves to user food array
})

module.exports = router;
