const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const predictRouter = require('./routes/predict')

const http = require('http').Server(app);
dotenv.config();

let data = {};
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
    console.log(data)
    console.log(name, roomName);
    if (roomName in data) {
      socket.to(roomName).emit('newRoomDeclined', "Room with this name already exists! Use another name")
    } else {
      data[roomName] = [[name]];
      socket.join(roomName)
      console.log(data)
      socket.to(roomName).emit('players-data', data[roomName]);
      socket.emit('newRoomAccepted', 'Room created successfully!!');
    }
  });


  //Listen for newUser
  socket.on('newUser', (name, roomName) => {
    try{
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
              socket.to(roomName).emit('players-data', data[roomName][0]);
          }
      } else {
          socket.emit('newUserDeclined', 'Room does not exist!! Check the Room Code again.');
      }
      console.log(data)
      socket.to(roomName).emit('players-data', data[roomName][0]);
    } catch(error) {
      console.log(error)}
});

  //Starting the game
  socket.on('startGame', (roomName) => {
    console.log(roomName, 'Recieved request to start the game')
    if (roomName in data) {
      console.log('Sending request to start game')
      socket.to(roomName).emit('enterGame', true);
    }
  })

  //Listen for user left
  socket.on('userLeft', (name, roomName) => {
    try{
      data[roomName][0].filter((user) => user === name);
    } catch(error) {

    }
  })
  console.log(data);


  //Listen for object Id request
  socket.on('generateObjId', (roomName) => {
    const max = 200;
    const objId = Math.floor(Math.random() * max);
    console.log(roomName, 'line 88', objId);
    if (roomName in data) {
        data[roomName][1] = objId;
        console.log(data, 'line 93');
    }
});

socket.on('requestObjId', (roomName) => {
  socket.to(roomName).emit('sendingObjId', data[roomName][1]);
});


})



app.use(bodyParser.json());



app.get('/', (req, res) => {
  res.send('hii')
});

app.use('/', predictRouter);



http.listen(process.env.PORT)
