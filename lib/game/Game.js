"use strict"

var Dog = require('./Dog')
var Pen = require('./Pen')
var SheepGroup = require('./SheepGroup.js')

function Game(sheepNum) {
  this.sheep = new SheepGroup(sheepNum);
  this.dogs = [];
  this.pen = new Pen();
  this.now = Date.now();
  this.then = Date.now();
  this.sheepPennedNumber = 0;
  this.sheepLostNumber = 0;
  this.sheepActiveNumber = sheepNum;
  this.gameState = 'active';
}

Game.prototype.setDog = function(dogId){
  this.dogs.push(new Dog(dogId))
}

Game.prototype.update = function(modifier){
    this.dogs.forEach(function(dog){
      dog.update(modifier);
    })
    this.sheep.update(modifier, this.dogs, this.pen);
    this.sheepPennedNumber = this.sheep.pennedSheep.length;
    this.sheepLostNumber = this.sheep.lostSheep.length;
    this.sheepActiveNumber = this.sheep.activeSheep.length;
}
Game.prototype.main = function(){
    this.now = Date.now();
    this.delta = this.now - this.then;
    this.update(this.delta / 1000)
    if(!this.checkGameEnd()){
      this.then = this.now;
    }else{
      this.gameState = 'endGame'
    }
    return this.gameState;
}
Game.prototype.setKeysDown = function(keysDown){
  this.dogs.forEach(function(dog){
    if(dog.id === keysDown.dogId){
      dog.keysDown = keysDown;
    }
  })
}
Game.prototype.checkGameEnd = function(){
    if(this.sheep.activeSheep.length === 0){
      // alert('Game is Over!')
      return true;
    }
    return false;
}
Game.prototype.initializeGame = function(){
    this.sheep.activeSheep.forEach(eachSheep => eachSheep.setPenLocation(this.pen))
    this.then = Date.now();
    return this.packagedGameInfo();
}
Game.prototype.packagedGameInfo = function(){
  var sheepLocation = this.sheep.activeSheep.map(function(sheep){
    return {
      x: sheep.x,
      y: sheep.y
    }
  })
  var DogsLocation = this.dogs.map(function(dog){
    return {
      id: dog.id,
      x: dog.x,
      y: dog.y
    }
  })
  return {
    DogsLocation: DogsLocation,
    SheepLocation: sheepLocation,
    GameState: this.gameState,
    PenLocation: {
      x: this.pen.boundaries.xBounds[0] + 60,
      y: this.pen.boundaries.yBounds[0] + 60
    },
    status: {
      sheepPenned: this.sheepPennedNumber,
      sheepLost : this.sheepLostNumber,
      sheepActive : this.sheepActiveNumber
    }
  }
}


module.exports = Game;
