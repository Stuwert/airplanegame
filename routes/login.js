var express = require('express');
var router = express.Router();
var User = require('../lib/mongo/models/userModel')
var FlightInfo = require('../lib/mongo/models/flightInfoModel')
var unirest = require('unirest')

router.post('/login', function(req, res){
  var username = req.body['body[username]'];
  var password = req.body['body[password]'];
  FlightInfo.find({}, function(err, flightInfo){
    if (err) throw err;

    unirest.get('http://localhost:8000/login')
      .headers({
        flightInfo: flightInfo[0].flightNumber,
        username: username,
        password: password
      })
      .end(function(response){
        if(response.code === 200){
          User.find({username: response.body.username}, function(err, user){
            if (err) throw err;;
            if(user.length > 0){
              user.authorization = response.body.authorization

              user.save(function(err){
                if(err) throw err;

                res.json(user)
              })
            }else{
              var newUser = new User({
                name: response.body.username,
                milesEarned: response.body.milesEarned,
                email: response.body.email,
                status: response.body.status,
                seatNumber: response.body.seatRow,
                seatLetter: response.body.seatLocation,
                authorization: response.body.authorization
              })
              newUser.save(function(err){
                if(err) throw err;

                res.json(newUser)
              })
            }
          })
        }
      })
  })
  // sends post request to api
  // api sends ok or not
  // if ok, mongo checks user ID for existence
  // if exists, logs in with JWT
  // if doesn't exist, create document
  // returns jwt
})

module.exports = router;
