import React from 'react';
import { useNavigate } from 'react-router-dom';

export function About({socket}) {
 const navigate = useNavigate();

 return (
   <div className="flex flex-col items-center justify-around min-h-screen">
     <div className="mb-4">
       <h1 className="mt-10 text-6xl font-bold text-white sm:text-6xl md:text-8xl">
         Doodle Wars
       </h1>
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

