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

    console.log("line 47",name, roomName);
    if (roomName in data) {
      socket.join(roomName)
      data[roomName].push(name);
      console.log('line 51', data);
      socket.emit('newUserAccepted', `You joined the ${roomName} successfully!!`);

      //To send players data
      socket.to(roomName).emit('players-data', data[roomName]);
      
    } else {
      socket.emit('newUserDeclined', 'Room does not exist!! Check the Room Code again.')
    }
  });

  //Starting the game
  socket.on('startGame', (roomName) => {
    console.log(roomName, 'Recieved request to start the game')
    if (roomName in data) {
      console.log('Sending request to start game')
      socket.to(roomName).emit('enterGame', 'you can enter the game');
    }
  })

  //Listen for user left
  socket.on('userLeft',(name, roomName) => {
    data[roomName].filter((user) => user === name);
  })
  console.log(data);
  

})



app.use(bodyParser.json());



app.get('/', (req, res) => {
  res.send('hii')
});

app.use('/', predictRouter);



http.listen(process.env.PORT)
