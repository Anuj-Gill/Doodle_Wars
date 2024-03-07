import { useNavigate } from "react-router-dom";

export function Home({ socket }) {
  const navigate = useNavigate();

  console.log(socket.id);

  return (
    <div className="flex flex-col items-center justify-around min-h-screen">
      <div className="mb-4">
        <h1 className="mt-10 text-xl md:text-4xl lg:text-5xl xl:text-6xl font-bold font-irish-grover text-white text-center items-center">
          Doodle Wars
        </h1>
      </div>
      <div className="flex flex-col gap-4 mb-4">
        <button
          className="w-full max-w-xs px-6 py-3 bg-white text-blue-900 rounded-md font-irish-grover font-bold hover:text-white hover:bg-blue-900 transition-colors duration-300"
          onClick={() => navigate('/createroom')}
        >
          CREATE ROOM
        </button>
        <button
          className="w-full max-w-xs px-6 py-3 bg-white text-blue-900 rounded-md font-irish-grover font-bold hover:text-white hover:bg-blue-900 transition-colors duration-300"
          onClick={() => navigate('/joinroom')}
        >
          JOIN ROOM
        </button>
      </div>
    </div>
  );
}