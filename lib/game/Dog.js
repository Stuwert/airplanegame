'use strict'

class Dog {
  constructor(){
    this.x = 7.5;
    this.y = 7.5;
    this.speed = 150;
  }
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

Dog.prototype.update = function(modifier, keysDown){
  if (38 in keysDown){
    this.y -= this.speed * modifier;
  }
  if(40 in keysDown){
    this.y += this.speed * modifier;
  }
  if(37 in keysDown){
    this.x -= this.speed * modifier;
  }
  if(39 in keysDown){
    this.x += this.speed * modifier;
  }
  this.catchDog();
}

module.exports = Dog;