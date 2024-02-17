import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { WhiteBoard } from './components/WhiteBoard'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-gray-400 h-screen pt-10'>
      <WhiteBoard />
    </div>
  )
}

export default App
