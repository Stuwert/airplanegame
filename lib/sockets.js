var io = require('socket.io')();
var clients = {};
var totalUsers = 0;
var rooms = {
  "room1":
  {
    "users" : [],
    "game" : [0, 0, 0]
  },
  "room2" : {
    "users" : [],
    "game" : [0, 0, 1]
  },
  "room3":{
    "users" : [],
    "game" : [1, 0, 0]
  }
}

io.sockets.on('connection', function(socket){
  console.log("connections");
  totalUsers++;
  socket.emit('verify', "You're Connected!")
  io.sockets.emit('userCount', totalUsers);

  socket.on('joinGame', function(username, room){
    if(rooms[room].user.length < 2){
      socket.username = username;
      socket.room = room;
      rooms[room].users.push(username);
      socket.join(room);
      socket.emit('joined', "you connected to " + room[0].name)
      io.sockets.emit('roomInfo', rooms)
    }else{
      socket.emit('roomResponse', 'could not connect to room')
    }
  })

  socket.on('updateGame', function(data){
    var game = "notification";
    io.sockets.in(socket.room).emit('updateGame', game)
  })





  socket.on('disconnect', function(){
    totalUsers--;
    if (socket.room){
      rooms[socket.room].users.splice(rooms[socket.room].users.indexOf(userName), 1);
      socket.leave(socket.room);
    }
    io.sockets.emit('roomInfo', rooms);
  })

})




module.exports = io;
