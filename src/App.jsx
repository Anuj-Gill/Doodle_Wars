import { useState } from 'react';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { Home }  from './components/Home';
import { JoinRoom } from './components/JoinRoom';
import { CreateRoom } from './components/CreateRoom';
import { StartGame } from './components/StartGame';
import { Wait } from './components/Wait';
import { BattleArena } from './components/BattleArena';
import { About } from './components/About';
import socketIO from 'socket.io-client';
const dotenv = require("dotenv");

const socket = socketIO.connect("https://doodlewars-backend.onrender.com");

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
    <div className='bg-[url("./assets/background.png")] bg-cover bg-center  bg-no-repeat'>
      <Routes>
        <Route path='/' element={<About socket={socket} />} />
        <Route path='/home' element={<Home socket={socket}/>} />
        <Route path='/joinroom' element={<JoinRoom socket={socket}/>} />
        <Route path='/createroom' element={<CreateRoom socket={socket}/>} />
        <Route path='/startgame' element={<StartGame socket={socket}/>} />
        <Route path='/wait' element={<Wait socket={socket}/>} />
        <Route path='/battlearena' element={<BattleArena socket={socket}/>} />
      </Routes>
    </div>

    </BrowserRouter>
    
  )
}

export default App
