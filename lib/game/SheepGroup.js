'use strict'

let SheepConstructor = require('./Sheep')

function SheepGroup (sheepNum){
  this.activeSheep = [];
  for(var i = 0; i < sheepNum; i++){
    var randomSheepCoord = randCoord();
    // currently a workaround to not having a better sheep generator
    this.activeSheep.push(new SheepConstructor(randomSheepCoord[0], randomSheepCoord[1]))
  }
  this.lostSheep = [];
  this.pennedSheep = [];
}

SheepGroup.prototype.penSheep = function(i){
  var sheepToPen = this.activeSheep.splice(i, 1);
  this.pennedSheep.push(sheepToPen)
}

SheepGroup.prototype.loseSheep = function(i){
  var aLostSheep = this.activeSheep.splice(i, 1);
  this.lostSheep.push(aLostSheep);
}

SheepGroup.prototype.update = function(modifier, dogs, pen){
  var that = this;
  this.activeSheep.forEach(function(sheep, i){
    sheep.dogDistance(dogs);
    var otherSheep = that.activeSheep.slice(0, that.activeSheep.length);
    otherSheep.splice(i, 1);
    sheep.move(modifier, otherSheep);
    if(sheep.collisionDetect(pen)){
      that.penSheep(i)
    }
    if(sheep.boundaryCollision()){
      that.loseSheep(i);
    }
  })
}

function randCoord(){
  var newArr = [];
  for(var i =0; i <2; i++){
    var nextNum = returnRandom(70, 430)
    newArr.push(nextNum)
  }

  return newArr;
}

function returnRandom(min, max){
  return Math.floor(Math.random() * (max - min)) + min;
}

module.exports = SheepGroup;
