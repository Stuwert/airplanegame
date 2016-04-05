"use strict"

var GameTemplate = require('./GameRoom')

var Rooms = function(){
  this.gameRooms = [];
  this.latestGameRoomIndex = -1;
  this.numberOfGameRooms = 0;
}

Rooms.prototype.makeNewGameRoom = function(id){
  this.gameRooms.push(new GameTemplate(id));
  this.numberOfGameRooms++;
  this.latestGameRoomIndex++;
}

Rooms.prototype.deleteRoom = function(index){
  this.gameRooms.splice(index, 1);
  this.numberOfGameRooms--;
  this.latestGameRoomIndex++;
}

Rooms.prototype.lastGameRoom = function(){
  return this.gameRooms[this.latestGameRoomIndex];
}

module.exports = Rooms;
