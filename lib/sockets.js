"use strict"

var io = require('socket.io')();
var uuid = require('node-uuid')
var Rooms = require('./Rooms')
var clients = {};
var totalUsers = 0;

var gameRooms = new Rooms();


io.sockets.on('connection', function(socket){
  totalUsers++;
  socket.emit('verify', "You're Connected!");

// Check if there are no rooms
// Are rooms full?
// Make a new room
// Join Room

var currId;
  socket.on('joinGame', function(username){
    console.log(gameRooms.numberOfGameRooms);
    if(gameRooms.numberOfGameRooms === 0 || gameRooms.lastGameRoom().isFull){
      gameRooms.makeNewGameRoom(uuid.v4())
    }
    socket.room = gameRooms.lastGameRoom().id;
    gameRooms.lastGameRoom().joinRoom(username)
    socket.join(socket.room)
    currId = gameRooms.myGameRoom(socket.room);
    if(gameRooms.gameRooms[currId].isFull){
      //Unsure if this is actually utilizing the reference object or a copy
      currId = gameRooms.myGameRoom(socket.room);
      let initialGameInfo = gameRooms.gameRooms[currId].startGame();
      io.sockets.in(socket.room).emit("gameStart", initialGameInfo)
      sendGame();
      socket.on('keyInfo', function(info){
        currId = gameRooms.myGameRoom(socket.room);
        gameRooms.gameRooms[currId].game.setKeysDown(info)
      })
    }
    io.sockets.emit('gameRooms', gameRooms)
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
    }
  }


  // io.sockets.emit('userCount', totalUsers);
  //
  // socket.on('joinGame', function(username, room){
  //   if(rooms[room].users.length < 2){
  //     socket.username = username;
  //     socket.room = room;
  //     rooms[room].users.push(username);
  //     socket.join(room);
  //     socket.emit('joined', "you connected to " + room)
  //     io.sockets.emit('roomInfo', rooms)
  //   }else{
  //     socket.emit('roomResponse', 'could not connect to room')
  //   }
  // })




  socket.on('disconnect', function(){
    currId = gameRooms.myGameRoom(socket.room);
    gameRooms.deleteRoom(socket.id)
  })

})




module.exports = io;
