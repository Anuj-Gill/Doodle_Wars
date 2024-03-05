import { useNavigate } from "react-router-dom";

export function Home({ socket }) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold font-irish-grover text-white sm:text-5xl md:text-6xl">Doodle Wars</h1>
      </div>
      <div className="flex flex-col sm:flex-row mb-4">
        <button
          className="px-6 py-3 mb-4 sm:mb-0 sm:mr-4 bg-white text-blue-900 rounded-md hover:bg-gray-200 transition-colors duration-300"
          onClick={() => navigate('/createroom')}
        >
          CREATE ROOM
        </button>
        <button
          className="px-6 py-3 bg-white text-blue-900 rounded-md hover:bg-gray-200 transition-colors duration-300"
          onClick={() => navigate('/joinroom')}
        >
          JOIN ROOM
        </button>
      </div>
      <div className="flex items-center">
        <span className="text-white mr-2">Socket ID:</span>
        <span className="text-gray-300">{socket.id}</span>
      </div>
    </div>
  );
}