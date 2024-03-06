import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Wait({ socket }) {

    const navigate = useNavigate();
    const [startStatus, setStartStatus] = useState(false);
    const [players, setPlayers] = useState([]);

    const name = localStorage.getItem('userName');
    const code = localStorage.getItem('roomName');

    socket.on('startNewGame', (message, objId) => {
        if (message) {
            navigate('/battlearena');
        }
    });

    function handleExit(e) {
        e.preventDefault();
        localStorage.removeItem('userName');
        localStorage.removeItem('roomName');
        socket.emit('userLeft', (name, code));
        navigate('/');
    }

    useEffect(() => {
        socket.emit('req-players-data', localStorage.getItem('roomName'));
    }, [])


    return (
        <div className="flex flex-col items-center justify-center min-h-screen font-irish-grover text-white text-2xl">
            <button className="absolute top-2 right-1 px-6 py-2 mb-4 sm:mb-0 sm:mr-1 bg-white font-irish-grover text-blue-900 rounded-md hover:bg-gray-200 transition-colors duration-300 font-bold"  onClick={handleExit}>Leave Room</button>
            {!startStatus &&
                <div>
                    <div>Welcome {name}. Your Room Code is: {code}</div>
                    Players:
                    {players.map((player, index) => {
                        console.log(player, index)
                        return (<p key={index}>{player}</p>)
                    })}
                </div>
            }
                <div className="flex">
                <p className="animate-spin h-5 w-5 mr-3  " viewBox="0 0 24 24">
                @
                </p>
                Waiting for the host to start the game...
                </div>
            {/* You can add more UI elements for when the game is about to start */}
        </div>
    )
}