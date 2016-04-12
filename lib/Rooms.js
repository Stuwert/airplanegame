"use strict"

var uuid = require('node-uuid')
var GameTemplate = require('./GameRoom')

var Rooms = function(){
  this.gameRooms = {};
  this.numberOfGameRooms = 0;
}

Rooms.prototype.makeNewGameRoom = function(){
  var newId = uuid.v4();
  this.gameRooms[newId] = new GameTemplate();
  this.numberOfGameRooms++;
  return newId;
}

Rooms.prototype.deleteRoom = function(id){
  delete this.gameRooms[id]
  this.numberOfGameRooms--;
}

Rooms.prototype.nextAvailableRoom = function(){
  for(var room in this.gameRooms){
    if(!this.gameRooms[room].isFull){
      return room;
    }
  }
  return this.makeNewGameRoom();
}

Rooms.prototype.joinNextAvailableRoom = function(dogId){
  console.log(dogId);
  var nextRoom = this.nextAvailableRoom();
  this.gameRooms[nextRoom].joinRoom(dogId)
  return nextRoom;
}

// Rooms.prototype.myGameRoom = function(id){
//   let holder = -1;
//   this.gameRooms.forEach(function(room, i){
//     if (room.id === id){
//       holder = i;
//     }
//   })
//   return holder;
// }

module.exports = Rooms;
