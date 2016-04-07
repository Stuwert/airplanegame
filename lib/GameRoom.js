"use strict"

let Game = require('./game/Game');



class GameTemplate{
  constructor(id){
    this.players = [];
    this.id = id;
    this.maxSize = 1;
    this.isFull = false;
    this.game = new Game(2);
  }
}

GameTemplate.prototype.joinRoom = function(nextPlayer, dogId){
  this.players.push(nextPlayer);
  this.game.setDog(dogId);
  if (this.players.length >= this.maxSize){
    this.isFull = true;
  }
}

GameTemplate.prototype.isFull = function(){
  return this.isFull;
}

GameTemplate.prototype.startGame = function(){
  return this.game.initializeGame();
}

module.exports = GameTemplate;
