var io = require('socket.io')();


io.sockets.on('connection', function(socket){
  socket.on('game1', function(user) {
    io.sockets.emit('new user', user.name + " has joined.")
  })
})


module.exports = io;
