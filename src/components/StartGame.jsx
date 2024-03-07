import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LeaveRoomBtn } from "./LeaveRoomBtn";

export function StartGame({ socket }) {

    const navigate = useNavigate();
    const [players, setPlayers] = useState([]);


    const name = localStorage.getItem('userName');
    const code = localStorage.getItem('roomName');

    function handleStart(e) {
        e.preventDefault();
        socket.emit('startNewGame', localStorage.getItem('roomName'));
        socket.emit('generateObjId', localStorage.getItem('roomName'));
        navigate('/battlearena');
    }

    useEffect(() => {
        socket.emit('req-players-data', localStorage.getItem('roomName'));
    }, [])

    socket.on('players-data', (data) => {
        setPlayers(data)
    })

    return (
        <div className="flex flex-col items-center justify-center min-h-screen font-irish-grover text-white text-2xl">
            <LeaveRoomBtn socket={socket}/>
            {name && <div>
                <div>Welcome <span className="animate-pulse text-4xl">{name}</span>.</div>
                <p>Your Room Code is: <span className="animate-pulse text-4xl">{code}</span></p>
                <div className="flex justify-start">
                Players:
                <div className="flex flex-col gap-y-1 ml-2">
                    {players.map((player, index) => {
                        console.log(player, index)
                        return (<p key={index}>{player}</p>)
                    })}
                </div>
                </div>
                <div className="flex gap-x-5 mt-10">
                    <button className="px-6 py-2 mb-4 sm:mb-0 sm:mr-4 bg-white font-irish-grover text-blue-900 rounded-md hover:text-white hover:bg-blue-900 transition-colors duration-300 font-bold" onClick={handleStart}>Start Game</button>

                </div>
            </div>
            }
            {!name && <div>
                <h2>Looks like you haven't registered yet. Please register first!! <button className="px-6 py-2 mb-4 sm:mb-0 sm:mr-4 bg-white font-irish-grover text-blue-900 rounded-md hover:bg-gray-200 transition-colors duration-300 font-bold" onClick={() => navigate('/')}>Home</button></h2>
            </div>}
        </div>
    )
}