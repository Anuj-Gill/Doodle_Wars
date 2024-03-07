import React from 'react';
import { useNavigate } from 'react-router-dom';

export function About({socket}) {
 const navigate = useNavigate();

 return (
   <div className="flex flex-col items-center justify-around min-h-screen">
     <div className="mb-4">
       <h1 className="mt-10 text-6xl font-bold text-white sm:text-6xl md:text-8xl font-irish-grover">
         Doodle Wars
       </h1>
     </div>
     <div className="max-w-3xl text-center mb-8 bg">
        <p className="text-white text-lg">
          Doodle Wars is a fast-paced multiplayer game where players doodle
          random objects within 15 seconds, like cats, pizzas, or airplanes.
          Your doodles are scored by a neural network from 1 to 10. The highest
          scorer wins the round. It's addictive fun for all ages. Gather your
          friends, grab your pencils, and unleash your inner artist in the
          ultimate doodle battle!
        </p>
      </div>
     <div className="flex items-center">
       <button
         className="px-6 py-3 bg-blue-900 text-white font-bold rounded-md hover:bg-white hover:text-blue-900 transition-colors duration-300"
         onClick={() => navigate('/home')}
       >
         START GAME
       </button>
     </div>
   </div>
 );
};

