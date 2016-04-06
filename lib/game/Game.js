"use strict"

let Dog = require('./Dog')
let Pen = require('./Pen')
let SheepGroup = require('./SheepGroup.js')

class Game {
  constructor(sheepNum){
    this.sheep = new SheepGroup(sheepNum);
    this.dog = new Dog();
    this.pen = new Pen();
    this.now = Date.now();
    this.then = Date.now();
    this.keysDown = {};
    this.sheepPennedNumber = 0;
    this.sheepLostNumber = 0;
    this.sheepActiveNumber = sheepNum;
    this.gameState = 'active';
  }
  update(modifier){
    this.dog.update(modifier, this.keysDown);
    this.sheep.update(modifier, this.dog, this.pen);
    this.sheepPennedNumber = this.sheep.pennedSheep.length;
    this.sheepLostNumber = this.sheep.lostSheep.length;
    this.sheepActiveNumber = this.sheep.activeSheep.length;
  }
  main(){
    this.now = Date.now();
    this.delta = this.now - this.then;
    this.update(this.delta / 1000)
    if(!this.checkGameEnd()){
      this.then = this.now;
    }else{
      // this.endGame();
    }
  }
  setKeysDown(newObj, player){
    this.keysDown = newObj;
  }
  checkGameEnd(){
    if(this.sheep.activeSheep.length === 0){
      // alert('Game is Over!')
      return true;
    }
    return false;
  }
  initializeGame(){
    this.sheep.activeSheep.forEach(eachSheep => eachSheep.setPenLocation(this.pen))
    this.then = Date.now();
    this.main();
    return this.packagedGameInfo();
  }
  packagedGameInfo(){
    let sheepLocation = this.sheep.activeSheep.map(function(sheep){
      return {
        x: sheep.x,
        y: sheep.y
      }
    })
    return {
      DogsLocation: {
        player1: {
          x: this.dog.x,
          y: this.dog.y
        }
      },
      SheepLocation: sheepLocation,
      GameState: this.gameState,
      PenLocation: {
        x: this.pen.boundaries.xBounds[0] + 25,
        y: this.pen.boundaries.yBounds[0] + 25
      },
      status: {
        sheepPenned: this.sheepPennedNumber,
        sheepLost : this.sheepLostNumber,
        sheepActive : this.sheepActiveNumber
      }
    }
  }
}

module.exports = Game;
