'use strict'

function SheepConstructor(x, y){
  this.x = x;
  this.y = y;
  this.nearestWallDirection = [null, null];
  this.boundaries = {
    xBounds : [this.x - 10, this.x + 10],
    yBounds : [this.y - 10, this.y + 10]
  }
  this.speed = 20;
  this.dogDistanceLength = null;
  this.deltaY = 0;
  this.deltaX = 0;
  this.penLocation;
}

// need to randomize sheep position on construction or cheat.

SheepConstructor.prototype.dogDistance = function(dogs){
  var nearestDog = {
    distance: 100000,
    deltaX: null,
    deltaY: null
  };
  var that = this;
  dogs.forEach(function(dog){
    var tempDeltaX = that.x - dog.x;
    var tempDeltaY = that.y - dog.y;
    var tempDeltaSquared = Math.pow(tempDeltaX, 2) + Math.pow(tempDeltaY, 2);
    var tempDelta = Math.sqrt(tempDeltaSquared)
    if(tempDelta < nearestDog.distance){
      nearestDog.distance = tempDelta;
      nearestDog.deltaX = tempDeltaX;
      nearestDog.deltaY = tempDeltaY;
    }
  })
  this.deltaX = nearestDog.deltaX;
  this.deltaY = nearestDog.deltaY;
  this.dogDistanceLength = nearestDog.distance
}

SheepConstructor.prototype.move = function(modifier, otherSheep){
  var potentialDirection = [this.x, this.y]
  var newX, newY;
  var newBounds;
  if (dogIsNear(this.dogDistanceLength)){
    potentialDirection = this.moveTowardsPen(modifier);
  }
  else{
    potentialDirection = this.moveTowardsWall(modifier, ...this.nearestWallDirection);
  }
  if (otherSheep.length < 1 || !collideWithOtherSheep(newBoundaries(potentialDirection[0], potentialDirection[1]), otherSheep)){
    newBounds = newBoundaries(potentialDirection[0], potentialDirection[1]);
    newX = potentialDirection[0], newY = potentialDirection[1];
  } else{
    newBounds = newBoundaries(this.x, this.y)
    newX = this.x, newY = this.y;
  }
  this.updateBoundaries(newBounds, newX, newY);
  this.updateNearestWallDirection();
}

SheepConstructor.prototype.collisionDetect = function(gameObj){
  if (isIntersected(this.boundaries, gameObj.boundaries)){
    return true;
  }else{
    return false;
  }
}

SheepConstructor.prototype.boundaryCollision = function(){
  if(this.boundaries.xBounds[1] > 512 || this.boundaries.xBounds[0] < 0 || this.boundaries.yBounds[0] < 0 || this.boundaries.yBounds[1] > 512){
    return true;
  }
  return false;
}

SheepConstructor.prototype.updateBoundaries = function(newBounds, newX, newY){
  this.boundaries.xBounds = newBounds.xBounds;
  this.boundaries.yBounds = newBounds.yBounds;
  this.x = newX;
  this.y = newY;
}

SheepConstructor.prototype.updateNearestWallDirection = function(){
  var xWallDirection = 0;
  var yWallDirection = 0;
  if(this.x < 206){
    xWallDirection = -1;
  }else if (this.x > 306){
    xWallDirection = 1;
  }
  if(this.y < 206){
    yWallDirection = -1;
  }else if (this.y > 306){
    yWallDirection = 1;
  }
  this.nearestWallDirection = [xWallDirection, yWallDirection];
}

SheepConstructor.prototype.moveTowardsWall = function(modifier, xDirection, yDirection){
  let xMove = this.x += this.speed * modifier * xDirection;
  let yMove = this.y += this.speed * modifier * yDirection;
  return [xMove, yMove]
}

SheepConstructor.prototype.moveTowardsPen = function(modifier){
  var DAMPEN_DOG_EFFECT = 50;
  var xDirection = (this.penLocation[0] - this.x) / Math.abs(this.x - this.penLocation[0]);
  var yDirection = (this.penLocation[1] - this.y) / Math.abs(this.y - this.penLocation[1]);
  var xMoveTowardsPen = xDirection
  var yMoveTowardsPen = yDirection
  var xDogDelta = this.deltaX  / Math.abs(this.deltaX)
  var yDogDelta = this.deltaY / Math.abs(this.deltaY)
  var xMove = this.x += modifier * this.speed * ( xMoveTowardsPen + xDogDelta );
  var yMove = this.y += modifier * this.speed *  ( yMoveTowardsPen + yDogDelta );
  return [xMove, yMove]
}

SheepConstructor.prototype.setPenLocation = function(pen){
  var xDirection = (pen.boundaries.xBounds[0] + pen.boundaries.xBounds[1]) / 2;
  var yDirection = (pen.boundaries.yBounds[0] + pen.boundaries.yBounds[1]) / 2;
  this.penLocation = [xDirection, yDirection];
}

function isIntersected(sheepBounds, collidingObjectBound){
  //takes two arrays, both should be in the same x/y coordinate plane
  var xReturnable = false;
  sheepBounds.xBounds.forEach(function(xBound){
    if(xBound > collidingObjectBound.xBounds[0] && xBound < collidingObjectBound.xBounds[1]){
      xReturnable = true;
    }
  })
  var yReturnable = false;
  sheepBounds.yBounds.forEach(function(yBound){
    if(yBound > collidingObjectBound.yBounds[0] && yBound < collidingObjectBound.yBounds[1]){
      yReturnable = true;
    }
  })
  return (xReturnable && yReturnable);
}

function newBoundaries(x, y){
  return {
    xBounds: [x - 10, x + 10],
    yBounds: [y - 10, y + 10]
  }
}

function collideWithOtherSheep (thisSheepBoundaries, otherSheep){
  var returnable = false;

  otherSheep.forEach(function(sheep){
    if(isIntersected(thisSheepBoundaries, sheep.boundaries)){
      returnable = true;
    }
  })

  return returnable;
}

function dogIsNear(dist){
  var MAX_DOG_DISTANCE = 100;
  return dist <= MAX_DOG_DISTANCE;
}

module.exports = SheepConstructor;
