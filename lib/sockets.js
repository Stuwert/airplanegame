"use strict"

var io = require('socket.io')();
var uuid = require('node-uuid')
var Rooms = require('./Rooms')
var HelpRequest = require('./mongo/models/helpRequestModel')
var OrderRequest = require('./mongo/models/orderModel')
var clients = {};
var totalUsers = 0;
var User = require('./mongo/models/userModel')

var gameRooms = new Rooms();


io.sockets.on('connection', function(socket){

  socket.on('joinGame', function(){
    var uniquePlayerId = uuid.v4()
    socket.emit('verify', uniquePlayerId);
    socket.room = gameRooms.joinNextAvailableRoom(uniquePlayerId);
    socket.join(socket.room)
    io.sockets.in(socket.room).emit('gameLoading', 'gameLoading');

    if(gameRooms.gameRooms[socket.room].isFull){
      var initialGameInfo = gameRooms.gameRooms[socket.room].startGame();
      io.sockets.in(socket.room).emit("gameStart", initialGameInfo, 'gamePlay')
      sendGame();
    }
    io.sockets.emit('gameRooms', gameRooms)
  })

  socket.on('keyInfo', function(info){
    if(gameRooms.gameRooms[socket.room]){
      gameRooms.gameRooms[socket.room].game.setKeysDown(info)
    }
  })

  function sendGame(){
    if(gameRooms.gameRooms[socket.room]){
      if(gameRooms.gameRooms[socket.room].game.gameState !== 'endGame'){
        gameRooms.gameRooms[socket.room].game.main();
        var gameInfo = gameRooms.gameRooms[socket.room].game.packagedGameInfo();
        io.sockets.in(socket.room).emit('updateGame', gameInfo);
        setTimeout(sendGame, 5);
      }else{
        let gameInfo = gameRooms.gameRooms[socket.room].game.packagedGameInfo();
        io.sockets.in(socket.room).emit('gameEnd', gameInfo)
      }
    }
  }

  socket.on('leaveGame', function(keyInfo){
    var dogId = keyInfo.dogId;
    io.sockets.in(socket.room).emit('gameCancelled', 'A User has left the game')
    gameRooms.deleteRoom(socket.room)
    socket.leave(socket.room)
  })


  socket.on('disconnect', function(){


  })


  socket.on('makeHelpRequest', function(newRequest, user){

    // console.log(newRequest);
    // console.log(user);

    if(user.userExists){
      var helpRequest = new HelpRequest({
        title: newRequest.title,
        passengerName: user.name,
        details: newRequest.details,
        seatNumber: user.seatNumber,
        seatLetter: user.seatLetter,
        completed: false
      })

      helpRequest.save(function(err){
        if (err) throw err;

        console.log('help request saved')
        HelpRequest.find({completed: false}, function(err, requests){
          if(err) throw err;

          socket.emit('requestReceived', 'Request Received!')
          io.emit('helpRequests', requests)
        })
      })
    }else{
      io.emit('requestReceived', 'Please Log in!')
    }
  })
  socket.on('makeOrderRequest', function(newRequest, user){

    if(user.userExists){
      var orderRequest = new OrderRequest({
        passengerName: user.name,
        completed: false,
        items: newRequest.name,
        seatNumber: user.seatNumber,
        seatLetter: user.seatLetter
      })

      orderRequest.save(function(err){
        if (err) throw err;

        OrderRequest.find({completed: false}, function(err, requests){
          if(err) throw err;


          socket.emit('requestReceived', 'Request Received!')
          io.emit('orderRequests', requests)
        })
      })
    }else{
      io.emit('requestReceived', "Please Log in!")
    }


  })


  socket.on('joinAdmin', function(){
    socket.room = 'admin'
    socket.join(socket.room)

    OrderRequest.find({completed: false}, function(err, requests){
      if(err) throw err;

      io.sockets.in(socket.room).emit('orderRequests', requests)
    })
    HelpRequest.find({completed: false}, function(err, requests){
      if(err) throw err;

      io.sockets.in(socket.room).emit('helpRequests', requests)
    })

    socket.on('completeHelpRequest', function(requestId){

      console.log(requestId);

      HelpRequest.findById(requestId, function(err, help){
        if (err) throw err;

        help.completed = true;

        help.save(function(err){
          if (err) throw err;

          HelpRequest.find({completed: false}, function(err, requests){
            if(err) throw err;

            io.emit('helpRequests', requests)
          })
        })
      })

    })

    socket.on('completeOrderRequest', function(requestId){

      OrderRequest.findById(requestId, function(err, order){
        if (err) throw err;

        order.completed = true;

        order.save(function(err){
          if (err) throw err;

          OrderRequest.find({}, function(err, orders){
            if(err) throw err;

            io.emit('orderRequests', orders)
          })
        })
      })

    })
  })

  socket.on('leaveAdmin', function(){
    socket.leave(socket.room);
  })


})



module.exports = io;
