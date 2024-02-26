import { useState } from 'react';
import './App.css';
import { WhiteBoard } from './components/WhiteBoard';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import { Home }  from './components/Home';
import { JoinRoom } from './components/JoinRoom';
import { CreateRoom } from './components/CreateRoom';
import { StartGame } from './components/StartGame';
import { Wait } from './components/Wait';
import { BattleArena } from './components/BattleArena';
import socketIO from 'socket.io-client';

const socket = socketIO.connect("http://localhost:5000");

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/play' element={<WhiteBoard />}  />
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        <Route path='/joinroom' element={<JoinRoom />} />
        <Route path='/createroom' element={<CreateRoom />} />
        <Route path='/startgame' element={<StartGame />} />
        <Route path='/wait' element={<Wait />} />
        <Route path='/battlearena' element={<BattleArena />} />
      </Routes>

    </BrowserRouter>
    
  )
}

export default App
