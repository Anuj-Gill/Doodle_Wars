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
import { Score } from './components/Score';
import socketIO from 'socket.io-client';

const socket = socketIO.connect("http://localhost:4000");

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home socket={socket} />} />
        <Route path='/home' element={<Home socket={socket}/>} />
        <Route path='/joinroom' element={<JoinRoom socket={socket}/>} />
        <Route path='/createroom' element={<CreateRoom socket={socket}/>} />
        <Route path='/startgame' element={<StartGame socket={socket}/>} />
        <Route path='/wait' element={<Wait socket={socket}/>} />
        <Route path='/battlearena' element={<BattleArena socket={socket}/>} />
        <Route path='/score' element={<Score socket={socket}/>} />
      </Routes>

    </BrowserRouter>
    
  )
}

export default App
