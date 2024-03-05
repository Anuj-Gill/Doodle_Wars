const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
// const predictRouter = require('./routes/predict')

const http = require('http').Server(app);
dotenv.config();

let data = {};
let scores = {};
console.log(data)


app.use(cors())
const socketIO = require('socket.io')(http, {
  cors: {
    origin: 'http://localhost:5173'
  }
})

//Socket Logic

socketIO.on('connection', (socket) => {
  console.log(`New connection: ${socket.id}`);
  socket.on('disconnect', () => {
    console.log("a user dissonncted!!")
  })

  //Listen for newRoom
  socket.on('newRoom', (name, roomName) => {
    if (roomName in data) {
      socketIO.to(socket.id).emit('newRoomDeclined', "Room with this name already exists! Use another name")
    } else {
      socket.join(roomName)
      data[roomName] = [[name]];
      console.log(data)
      socketIO.in(roomName).emit('players-data', data[roomName]);
      socket.emit('newRoomAccepted', 'Room created successfully!!', data[roomName][0]);
    }
  });


  //Listen for newUser
  socket.on('newUser', (name, roomName) => {
    try {
      if (roomName in data) {
        if (data[roomName][0].includes(name)) {
          if (data[roomName][0][0] === name) {
            socket.join(roomName);
            socket.emit('newUserAccepted', `Admin joined ${roomName} room successfully!!`, data[roomName][0]);
          } else {
            socket.emit('newUserDeclined', 'User name already taken! Join with another username.');
          }
        } else {
          socket.join(roomName);
          data[roomName][0].push(name);
          socket.emit('newUserAccepted', `You joined ${roomName} room successfully!!`, data[roomName][0]);
          socketIO.in(roomName).emit('players-data', data[roomName][0]);
          socket.to(roomName).emit('players-data', data[roomName][0]);
        }
      } else {
        socket.emit('newUserDeclined', 'Room does not exist!! Check the Room Code again.');
      }
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  });



  socket.on('req-players-data', (roomName) => {
    if (roomName in data) {
      socketIO.in(roomName).emit('players-data', data[roomName][0]);
    }
  })

  //Starting the game
  socket.on('startNewGame', (roomName) => {
    console.log(roomName, 'Recieved request to start the game')
    if (roomName in data) {
      console.log('Sending request to start game')
      console.log('startingNewGame');
      socket.to(roomName).emit('startNewGame', true);

    }
  })

  //Listen for user left
  socket.on('userLeft', (name, roomName) => {
    try {
      data[roomName][0].filter((user) => user === name);
    } catch (error) {

    }
  })
  console.log(data);


  //Listen for object Id request
  socket.on('generateObjId', (roomName) => {
    const max = 25;
    const objId = Math.floor(Math.random() * max);
    console.log(roomName, 'line 88', objId);
    if (roomName in data) {
      data[roomName][1] = objId;
      console.log(data, 'line 93');

    }
  });


  socket.on('requestObjId', (roomName) => {
    if (roomName in data) {
      socketIO.in(roomName).emit('sendingObjId', data[roomName][1]);
      console.log(data[roomName][1], 'line 104');
    }
    else {
      console.log('Join a room first!!')
      console.log('Error sending obj id');
    }
  });



  //scores
  socket.on('userScore', (user, roomName, score) => {

    console.log('got a request from', user, 'and room', roomName);

    if (!(roomName in scores)) {
      // If not present, initialize it with an empty object
      scores[roomName] = {};
    }
    // Assign the score to the user in the respective room
    scores[roomName][user] = score;
    console.log(scores)
  });

  socket.on('getWinnerName', (roomName) => {
    try {
      // Sort the scores dictionary based on scores in descending order
      const sortedScores = Object.fromEntries(Object.entries(scores[roomName]).sort(([, a], [, b]) => b - a));
      console.log(sortedScores)
      // Emit the sorted dictionary to clients
      socketIO.in(roomName).emit('winnerName', sortedScores);
    } catch (error) {
      console.log(error);
    }
  });

  socket.on('reqAdminName', (roomName) => {
    socketIO.in(roomName).emit('resIsAdmin', data[roomName][0][0]);
  })

  socket.on('userLeft', (userName, roomName) => {
    if(roomName in data){
      let i = data[roomName][0].indexOf(userName);
       if (i !== -1) {
        data[roomName][0].splice(i, 1);
      }
      
      
      if (data[roomName][0].length === 0) {
        delete data[roomName];
      } else {
        socketIO.in(roomName).emit('resIsAdmin', data[roomName][0][0]);
      }

    console.log(data);
    }
  })

})

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('hii')
});

// app.use('/', predictRouter);



http.listen(4000)
