var should = require('chai').should();
var expect = require('chai').expect;
var io = require('socket.io-client');

var socketURL = 'http://localhost:3000';

var options = {
  transports: ['websocket'],
  'force new connection' : true
}

var chatUser1 = {'name' : 'Tom'};
var chatUser2 = {'name' : 'Sally'};
var chatUser3 = {'name' : 'Dana'};


describe('Game Server', function(){
  it('Should broadcast a connection to the user', function(done){
    var client1 = io.connect(socketURL, options);
    client1.on('connect', function(data){
      client1.on('verify', function(response){
        response.should.equal("You're Connected!")
        client1.disconnect();
        done();
      })
    })
  })
  it('Should not broadcast that announcement to anyone else', function(done){
    var client1MessageNum = 0;
    var callNum = 0;
    var client1 = io.connect(socketURL, options);

    client1.on('verify', function(response){
      // This one is a bit tricky.  Basically we want to say that if it gets called twice, it will fail.
      // So we set a timeout to force it to stop, after a reasonable amount of time.
      client1MessageNum++;
      client1MessageNum.should.equal(1);
      if (client1MessageNum == 2){
        done();
      }
    })
    client1.on('connect', function(data){
      var client2 = io.connect(socketURL, options);
      client2.on('connect', function(data){
        client1.disconnect();
        client2.disconnect();
      })
    })
    setTimeout(done, 200);
  })
  it('Should update the total user count', function(done){
    var userCount = 0;

    var client1 = io.connect(socketURL, options);
    updateCount(client1);


    client1.on('connect', function(data){
      var client2 = io.connect(socketURL, options);
      updateCount(client2)
      client2.disconnect();
    })
    function updateCount(client){
      client.on('userCount', function(newUserCount){
        userCount++;
        userCount.should.equal(newUserCount);
        if(userCount == 2){
          client1.disconnect();
          done();
        }
      })
    }
  })
  it('Should be able to connect to a room', function(done){
    var clientz = io.connect(socketURL, options);
    clientz.on('connect', function(data){
      clientz.emit('joinGame', chatUser1.name, "room1")
      clientz.on('joined', function(response){
        response.should.equal("you connected to room1")
        clientz.disconnect();
        done();
      })
    })
  })
  it('Should be notified the number of players in a room', function(done){
    var clientz = io.connect(socketURL, options);
    clientz.on('connect', function(data){
      clientz.emit('joinGame', chatUser1.name, "room1")
      clientz.on('roomInfo', function(response){
        response.should.deep.equal(
          {
            "room1":
            {
              "users" : [
                "Tom"
              ],
              "game" : [0, 0, 0]
            },
            "room2" : {
              "users" : [],
              "game" : [0, 0, 1]
            },
            "room3":{
              "users" : [],
              "game" : [1, 0, 0]
            }
          }
        )
        clientz.disconnect();
        done();
      })
    })
  })
  it('Should allow two players to connect to a room', function(done){
    var client1 = io.connect(socketURL, options);
    client1.on('connect', function(data){
      client1.emit('joinGame', chatUser1.name, "room1")
      client1.on('joined', function(response){
        var client2 = io.connect(socketURL, options);
        client2.on('connect', function(moreData){
          client2.emit('joinGame', chatUser2.name, "room1");
          client2.on('joined', function(client2Response){
            client2Response.should.equal('you connected to room1');
            client2.on('roomInfo', function(allRooms){
              allRooms.room1.users.should.deep.equal(["Tom", "Sally"]);
              client1.disconnect();
              client2.disconnect();
              done();
            })
          })
        })
      })
    })
  })
  it('Should not allow another user if there are already 2 users in the room', function(done){
    var client1 = io.connect(socketURL, options);
    client1.on('connect', function(data){
      client1.emit('joinGame', chatUser1.name, "room1")
      client1.on('joined', function(response){
        var client2 = io.connect(socketURL, options);
        client2.on('connect', function(moreData){
          client2.emit('joinGame', chatUser2.name, "room1");
          client2.on('joined', function(client2Response){
            var client3 = io.connect(socketURL, options);
            client3.on('connect', function(client3Response){
              client3.emit('joinGame', chatUser3.name, "room1");
              client3.on('roomResponse', function(roomStatement){
                roomStatement.should.equal("could not connect to room");
                client1.disconnect();
                client2.disconnect();
                client3.disconnect();
                done();
              })
            })
          })
        })
      })
    })
  })
  it('Should get information about the current game state', function(done){
    var client1 = io.connect(socketURL, options);
    client1.on('connect', function(data){
      client1.emit('joinGame', chatUser1.name, "room1")
      client1.on('joined', function(response){
        var client2 = io.connect(socketURL, options);
        client2.on('connect', function(moreData){
          client2.emit('joinGame', chatUser2.name, "room1");
          client2.on('joined', function(client2Response){
            client2.emit('updateGame', "Bing Bong");
            client1.on('updateGame', function(gameResponse){
              console.log("test");
              gameResponse.should.deep.equal([0, 0, 0])
              client2.on('updateGame', function(otherGameResponse){
                otherGameResponse.should.deep.equal([0, 0, 0])
                client1.disconnect();
                client2.disconnect();
                done();
              })
            })
          })
        })
      })
    })
  })
  it('Should not get information about another games game state', function(done){
    var seesit = false;
    var client1 = io.connect(socketURL, options);
    client1.on('connect', function(data){
      client1.emit('joinGame', chatUser1.name, "room1")
      client1.on('joined', function(response){
        var client2 = io.connect(socketURL, options);
        client2.on('connect', function(moreData){
          client2.emit('joinGame', chatUser2.name, "room1");
          client2.on('joined', function(client2Response){
            var client3 = io.connect(socketURL, options);
            client3.on('connect', function(thing){
              client2.emit('updateGame', "Bing Bong");
              client3.on('updateGame', function(thingy){
                seesit = true;
                seesit.should.equal(false);
              })
              client1.disconnect();
              client2.disconnect();
              setTimeout(done, 400);
            })
          })
        })
      })
    })
  })
})
