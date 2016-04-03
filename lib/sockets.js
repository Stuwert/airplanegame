"use strict"

var io = require('socket.io')();
var uuid = require('node-uuid')
var GameTemplate = require('./gametemplate')
var clients = {};
var totalUsers = 0;

var gameRooms = [];


function lastGameIsFull(){
  return gameRooms[gameRooms.length - 1].isFull();
}

// var rooms = {
//   "room1":
//   {
//     "users" : [],
//     "game" : [0, 0, 0]
//   },
//   "room2" : {
//     "users" : [],
//     "game" : [0, 0, 1]
//   },
//   "room3":{
//     "users" : [],
//     "game" : [1, 0, 0]
//   }
// }

io.sockets.on('connection', function(socket){
  totalUsers++;
  socket.emit('verify', "You're Connected!");

  socket.on('joinGame', function(username){
    if(gameRooms.length === 0 || lastGameIsFull()){
      var id = uuid.v4();
      gameRooms.push(new GameTemplate(username, id));
    }else{
      var currGameRoom = gameRooms[gameRooms.length - 1];
      var id = currGameRoom.id;
      currGameRoom.addPlayer(username)
      io.sockets.in(socket.room).emit("gameStart", "The Game is Starting!")
    }
    io.sockets.emit('gameRooms', gameRooms)
    socket.room = id;
    socket.join(socket.room);
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
    totalUsers--;
    gameRooms.splice(gameRooms.indexOf(socket.room), 1);
    socket.leave(socket.room)
    delete socket.room
  })

})




module.exports = io;
