import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.jpeg'


export function About({ socket }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-around min-h-screen">
      <div className="">
        <div className='flex flex-col items-center  md:flex-row '>
          <img src={logo} className='h-36 w-36 animate-spin-slow md:mr-10 rounded-full '></img>
          <h1 className="text-6xl font-bold text-white sm:text-6xl md:text-8xl font-irish-grover">
            Doodle Wars
          </h1>
        </div>
      </div>
      <div className="max-w-3xl text-center sm:w-xl">
        <div className="bg-blue-400 bg-opacity-15 backdrop-blur-lg rounded-lg p-6">
          <p className="text-white text-xl sm:text-lg font-mono">
            Doodle Wars is a fast-paced multiplayer game where players doodle
            random objects within 15 seconds, like cats, pizzas, or airplanes.
            Your doodles are scored by a neural network from 1 to 10. The highest
            scorer wins the round. It's addictive fun for all ages. Gather your
            friends, grab your pencils, and unleash your inner artist in the
            ultimate doodle battle!
          </p>
        </div>
      </div>
      <div className="flex items-center">
        <button
          className="px-6 py-2 mb-4 sm:mb-0 sm:mr-4 bg-white font-irish-grover text-blue-900 rounded-md hover:text-white hover:bg-blue-900 transition-colors duration-300 font-bold"
          onClick={() => navigate('/home')}
        >
          START GAME
        </button>
      </div>
    </div>

  );
};

