"use strict"

let game =

class GameTemplate{
  constructor(id){
    this.players = [];
    this.game = null;
    this.id = id;
    this.maxSize = 1;
    this.isFull = false;
  }
}

GameTemplate.prototype.joinRoom = function(nextPlayer){
  this.players.push(nextPlayer);
  if (this.players.length >= this.maxSize){
    this.isFull = true;
  }
}

GameTemplate.prototype.isFull = function(){
  return this.isFull;
}

GameTemplate.prototype.startGame = function(){
  
}

module.exports = GameTemplate;
