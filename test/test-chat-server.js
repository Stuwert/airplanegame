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
    clientz.on('verify', function(response){

    })
    clientz.on('connect', function(data){

    })
  })
  xit('Should be notified the number of players in a room', function(){

  })
  xit('Should not allow another user if there are already 2 users in the room', function(){

  })
})


// describe('Chat Server', function(){
//   it('Should broadcast new user to all users', function(done){
//     var client1 = io.connect(socketURL, options);
//
//     client1.on('connect', function(data){
//       client1.emit('game1', chatUser1);
//
//       var client2 = io.connect(socketURL, options);
//
//       client2.on('connect', function(data){
//         client2.emit('game1', chatUser2);
//       })
//
//       client2.on('new user', function(usersName){
//         usersName.should.equal(chatUser2.name + " has joined.");
//         client2.disconnect();
//       });
//
//       var numUsers = 0;
//       client1.on('new user', function(usersName){
//         numUsers += 1;
//
//         if(numUsers ===2){
//           usersName.should.equal(chatUser2.name + " has joined.");
//           client1.disconnect();
//           done();
//         }else{
//           usersName.should.equal(chatUser1.name + " has joined.")
//         }
//       })
//
//     })
//
//   })
//   it('Should be able to broadcast messages', function(done){
//     var client1, client2, client3;
//     var message = "Hello World";
//     var messages = 0;
//
//     var checkMessage = function(client){
//       client.on('message', function(msg){
//         message.should.equal(msg);
//         client.disconnect();
//         messages++;
//         if (messages === 3){
//           done();
//         };
//       });
//     };
//
//     client1 = io.connect(socketURL, options);
//     checkMessage(client1);
//
//     client1.on('connect', function(data){
//       client2 = io.connect(socketURL, options);
//       checkMessage(client2);
//
//       client2.on('connect', function(data){
//         client3 = io.connect(socketURL, options);
//         checkMessage(client3);
//
//         client3.on('connect', function(data){
//           client2.send(message);
//         })
//       })
//     })
//
//   })
//
//   it('Should be able to send private messages', function(done){
//     var client1, client2, client3;
//     var message = {to: chatUser1.name, txt: 'Private Hello World'};
//     var messages = 0;
//
//     var completeTest = function(){
//       messages.should.equal(1);
//       client1.disconnect();
//       client2.disconnect();
//       client3.disconnect();
//       done();
//     }
//
//     var checkPrivateMessage = function(client){
//       client.on('private message', function(msg){
//         message.txt.should.equal(msg.txt);
//         msg.from.should.equal(chatUser3.name);
//         messages++;
//         if(client === client1){
//           setTimeout(completeTest, 40);
//         }
//       })
//     }
//
//     client1 = io.connect(socketURL, options);
//     checkPrivateMessage(client1);
//
//     client1.on('connect', function(data){
//       client1.emit('game1', chatUser1);
//       client2 = io.connect(socketURL, options);
//       checkPrivateMessage(client2);
//
//       client2.on('connect', function(data){
//         client2.emit('game1', chatUser2);
//         client3 = io.connect(socketURL, options);
//         checkPrivateMessage(client3);
//
//         client3.on('connect', function(data){
//           client3.emit('game1', chatUser3);
//           client3.emit('private message', message);
//         })
//
//       })
//
//     })
//
//   })
//
// })
