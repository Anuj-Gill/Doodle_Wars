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
      socket.emit('newRoomDeclined', "Room with this name already exists! Use another name")
    } else {
      data[roomName] = [name];
      socket.join(roomName)
      console.log(data)
      socket.to(roomName).emit('players-data', data[roomName]);
      socket.emit('newRoomAccepted', 'Room created successfully!!');
    }
  });


  //Listen for newUser
  socket.on('newUser', (name, roomName) => {

    if (roomName in data) {
      if (data[roomName].includes(name) && data[roomName][0] === name) {
        socket.join(roomName)
        socket.emit('newUserAccepted', `Admin joined ${roomName} room successfully!!`, data[roomName]);
      } else if (data[roomName].includes(name)) {
        socket.emit('newUserDeclined', 'User name already taken! Join with another username.')
      } else {
        socket.join(roomName)
        socket.emit('newUserAccepted', `You joined ${roomName} room successfully!!`, data[roomName]);
        socket.to(roomName).emit('players-data', data[roomName]);
        data[roomName].push(name);
      }
    } else {
      socket.emit('newUserDeclined', 'Room does not exist!! Check the Room Code again.')
    }
    socket.to(roomName).emit('players-data', data[roomName]);
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
      data[roomName].filter((user) => user === name);
    } catch(error) {

    }
  })
  console.log(data);


})



app.use(bodyParser.json());



app.get('/', (req, res) => {
  res.send('hii')
});

app.use('/', predictRouter);



http.listen(process.env.PORT)
