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

  socket.on('joinGame', function(username){
    if(gameRooms.numberOfGameRooms === 0 || gameRooms.lastGameRoom().isFull){
      gameRooms.makeNewGameRoom(uuid.v4())
    }
    let id = gameRooms.lastGameRoom().id;
    gameRooms.lastGameRoom().joinRoom(username)
    socket.room = id;
    socket.join(socket.room)
    if(gameRooms.lastGameRoom().isFull){
      io.sockets.in(socket.room).emit("gameStart", "The Game is Starting!", 1)
    }
    io.sockets.emit('gameRooms', gameRooms)
  })

  socket.on('updateGame', function(data){
    io.sockets.in(socket.room).emit('updateGame', data)
  })

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

  })

})




module.exports = io;
