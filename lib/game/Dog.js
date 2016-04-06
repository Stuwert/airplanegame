'use strict'

function Dog(dogId){
  this.x = 7.5;
  this.y = 7.5;
  this.speed = 150;
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

module.exports = Dog;
