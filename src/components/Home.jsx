import { useNavigate } from "react-router-dom";

export function Home({ socket }) {
  const navigate = useNavigate();

  console.log(socket.id);

  return (
    <div className="flex flex-col items-center justify-around  min-h-screen">
      <div className=" mb-4">
        <h1 className="mt-10 text-8xl font-bold font-irish-grover text-white  sm:text-6xl md:text-8xl">Doodle Wars</h1>
      </div>
      <div className="flex flex-col sm:flex-row mb-4 gap-x-20 ">
        <button
          className="px-6 py-3 mb-4 sm:mb-0 sm:mr-4 bg-white font-irish-grover text-blue-900 rounded-md hover:bg-gray-200 transition-colors duration-300 font-bold "
          onClick={() => navigate('/createroom')}
        >
          CREATE ROOM
        </button>
        <button
          className="px-6 py-3 font-irish-grover font-bold bg-white text-blue-900 rounded-md hover:bg-gray-200 transition-colors duration-300"
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