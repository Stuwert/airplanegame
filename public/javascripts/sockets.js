
document.addEventListener("DOMContentLoaded", function(){


  var socket = io();
  socket.on('verify', function(message){
    alert(message)
    socket.emit('joinGame', 'testuser');
  })

  socket.on('gameRooms', function(gameRooms){
    console.log(gameRooms);
  })

  socket.on('updateGame', function(information){
    var newUl = document.createElement("ul");
    newUl.innerText = information;
    document.querySelector('ul').appendChild(newUl);
  })

  document.querySelector('button').addEventListener('click', function(){
    var chatVal = document.querySelector('input').value;
    socket.emit('updateGame', chatVal);
  })

  socket.on('gameStart', function(information){
    alert(information);
  })

})

//joinGame
//gameRooms
//gameStart
//updateGame
