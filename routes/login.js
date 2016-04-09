var express = require('express');
var router = express.Router();
var mongoose = require('./lib/mongo/dbPostCalls')


router.get('/signup', function(req, res){
  //sends signup route to api
  // api returns a JWT
  //sets to mongo and logs in
  //returns jwt
})

router.post('/login', function(req, res){
  // sends post request to api
  // api sends ok or not
  // if ok, mongo checks user ID for existence
  // if exists, logs in with JWT
  // if doesn't exist, create document
  // returns jwt 
})

module.exports = router;
