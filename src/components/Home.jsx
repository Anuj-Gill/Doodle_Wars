import { useNavigate } from "react-router-dom";
import logo from '../assets/logo.jpeg'

export function Home({ socket }) {
  const navigate = useNavigate();

  console.log(socket.id);

  return (
    <div className="flex flex-col items-center justify-around  min-h-screen">
      <div className='flex flex-col justify-end items-center md:flex-row '>
          <img src={logo} className='h-36 w-36 animate-spin-slow mr-10 rounded-full '></img>
          <h1 className="text-6xl font-bold text-white sm:text-6xl md:text-8xl font-irish-grover">
            Doodle Wars
          </h1>
        </div>
      <div className="flex flex-col sm:flex-row mb-4 gap-x-20 ">
        <button
          className="px-6 py-3 mb-4 sm:mb-0 sm:mr-4 bg-white font-irish-grover text-blue-900 rounded-md hover:text-white hover:bg-blue-900 transition-colors duration-300 font-bold "
          onClick={() => navigate('/createroom')}
        >
          CREATE ROOM
        </button>
        <button
          className="px-6 py-3 font-irish-grover font-bold bg-white text-blue-900 rounded-md hover:text-white hover:bg-blue-900 transition-colors duration-300"
          onClick={() => navigate('/joinroom')}
        >
          JOIN ROOM
        </button>
      </div>
      <div className="flex items-center">
      </div>
    </div>
  );
}