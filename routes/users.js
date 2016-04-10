var express = require('express');
var router = express.Router();
var User = require('../lib/mongo/models/userModel')

//Needs middleware to validate that this is ok.

router.post('/movies', function(req, res){
  User.findById(req.body.info.id, function(err, user){
    user.movies.push(req.body.info.movie)
    user.save(function(err){
      if (err) throw err;

      console.log('saved!')
    })
  })
})

router.post('/articles', function(req, res){
  User.findById(req.body.info.id, function(err, user){
    user.articles.push(req.body.info.article)
    user.save(function(err){
      if (err) throw err;

      console.log('saved!')
    })
  })
})

module.exports = router;
