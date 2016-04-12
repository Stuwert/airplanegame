"use strict"

let Game = require('./game/Game');



class GameTemplate{
  constructor(id){
    this.players = [];
    this.id = id;
    this.maxSize = 2;
    this.isFull = false;
    this.game = new Game(15);
  }
}

GameTemplate.prototype.joinRoom = function(dogId){
  console.log(dogId);
  this.players.push(dogId)
  this.game.setDog(dogId);
  console.log(this.players);
  if (this.players.length >= this.maxSize){
    console.log('all filled up');
    this.isFull = true;
  }
}

GameTemplate.prototype.startGame = function(){
  return this.game.initializeGame();
}

module.exports = GameTemplate;
