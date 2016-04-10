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
  totalUsers++;
  var uniquePlayerId = uuid.v4()
  socket.emit('verify', uniquePlayerId);




var currId;
  socket.on('joinGame', function(dogId){
    if(gameRooms.numberOfGameRooms === 0 || gameRooms.lastGameRoom().isFull){
      gameRooms.makeNewGameRoom(uuid.v4())
    }
    socket.room = gameRooms.lastGameRoom().id;
    gameRooms.lastGameRoom().joinRoom("testuser", dogId)
    socket.join(socket.room)
    io.sockets.in(socket.room).emit('gameLoading', 'gameLoading');
    currId = gameRooms.myGameRoom(socket.room);
    if(gameRooms.gameRooms[currId].isFull){
      currId = gameRooms.myGameRoom(socket.room);
      var initialGameInfo = gameRooms.gameRooms[currId].startGame();
      io.sockets.in(socket.room).emit("gameStart", initialGameInfo, 'gamePlay')
      sendGame();
    }
    io.sockets.emit('gameRooms', gameRooms)
  })

  socket.on('keyInfo', function(info){
    currId = gameRooms.myGameRoom(socket.room);
    gameRooms.gameRooms[currId].game.setKeysDown(info)
  })

  function sendGame(){
    currId = gameRooms.myGameRoom(socket.room);
    if(currId > -1 && gameRooms.gameRooms[currId].game.gameState !== 'endGame'){
      currId = gameRooms.myGameRoom(socket.room);
      gameRooms.gameRooms[currId].game.main();
      currId = gameRooms.myGameRoom(socket.room);
      let gameInfo = gameRooms.gameRooms[currId].game.packagedGameInfo();

      io.sockets.in(socket.room).emit('updateGame', gameInfo);
      setTimeout(sendGame, 5);
    }else{
      //save game information to user
      currId = gameRooms.myGameRoom(socket.room);
      let gameInfo = gameRooms.gameRooms[currId].game.packagedGameInfo();
      io.sockets.in(socket.room).emit('gameEnd', 'gameEnd', gameInfo)
    }
  }


  socket.on('disconnect', function(){
    currId = gameRooms.myGameRoom(socket.room);
    gameRooms.deleteRoom(socket.id)
  })



  socket.on('joinAdmin', function(){
    console.log('bing bong');
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

    socket.on('makeHelpRequest', function(newRequest){

      var helpRequest = new HelpRequest({
        title: newRequest.title,
        passengerName: newRequest.passengerName,
        details: newRequest.details,
        seatNumber: newRequest.seatNumber,
        seatLetter: newRquest.seatLetter,
        completed: false
      })

      helpRequest.save(function(err){
        if (err) throw err;

        console.log('help request saved')
        HelpRequest.find({completed: false}, function(err, requests){
          if(err) throw err;

          io.sockets.emit.in(socket.room).emit('helpRequests', requests)
        })
      })

    })
    socket.on('makeOrderRequest', function(newRequest){

      var orderRequest = new OrderRequest({
        passengerName: newRequest.passengerName,
        completed: false,
        items: newRequest.items,
        seatNumber: Number,
        seatLetter: String
      })

      orderRequest.save(function(err){
        if (err) throw err;

        console.log('order saved')
        OrderRequest.find({completed: false}, function(err, requests){
          if(err) throw err;

          io.sockets.emit.in(socket.room).emit('orderRequests', requests)
        })
      })

    })

    socket.on('completeHelpRequest', function(updateRequest){

      HelpRequest.findBy(updateRequest.id, function(err, help){
        if (err) throw err;

        help.completed = true;

        help.save(function(err){
          if (err) throw err;

          console.log("Help Saved ")
          HelpRequest.find({completed: false}, function(err, requests){
            if(err) throw err;

            io.sockets.emit.in(socket.room).emit('helpRequests', requests)
          })
        })
      })

    })

    socket.on('completeOrderRequest', function(updateRequest){

      OrderRequest.findBy(updateRequest.id, function(err, order){
        if (err) throw err;

        order.completed = true;

        User.find({name: updateRequest.passengerName}, function(err, user){
          user.food.push(updateRequest.item)
          user.save(function(err){
            if (err) throw err;

            console.log('user saved info')
          })
        })

        order.save(function(err){
          if (err) throw err;

          console.log("Order Saved")
        })
      })

    })
  })

  socket.on('leaveAdmin', function(){
    socket.leave(socket.room);
  })


})



module.exports = io;
