'use strict'

function Dog(dogId){
  var newRandomCoord = randCoord();
  this.x = newRandomCoord[0];
  this.y = newRandomCoord[1];
  this.speed = 85;
  this.id = dogId;
  this.keysDown = {};
}

Dog.prototype.catchDog = function(){
  if (this.x < 0){
    this.x = 0
  }
  if (this.x > 497){
    this.x = 497
  }
  if (this.y < 0){
    this.y = 0
  }
  if (this.y > 497){
    this.y = 497
  }
}

Dog.prototype.update = function(modifier){
  if (38 in this.keysDown){
    this.y -= this.speed * modifier;
  }
  if(40 in this.keysDown){
    this.y += this.speed * modifier;
  }
  if(37 in this.keysDown){
    this.x -= this.speed * modifier;
  }
  if(39 in this.keysDown){
    this.x += this.speed * modifier;
  }
  this.catchDog();
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

module.exports = Dog;
