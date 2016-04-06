'use strict'

let SheepConstructor = require('./Sheep')

function SheepGroup (sheepNum){
  this.activeSheep = [];
  for(var i = 0; i < sheepNum; i++){
    // currently a workaround to not having a better sheep generator
    this.activeSheep.push(new SheepConstructor(i * 50 + 10, i * 10 + 10))
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

SheepGroup.prototype.update = function(modifier, dog, pen){
  var that = this;
  this.activeSheep.forEach(function(sheep, i){
    sheep.dogDistance(dog);
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

module.exports = SheepGroup;
