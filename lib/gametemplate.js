"use strict"


function GameTemplate(firstPlayer, id){
  this.players = [firstPlayer];
  this.game = null;
  this.id = id;
}

GameTemplate.prototype.addPlayer = function(nextPlayer){
  this.players.push(nextPlayer);
}

GameTemplate.prototype.isFull = function(){
  return this.players.length >= 2;
}



module.exports = GameTemplate;
