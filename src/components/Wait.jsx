import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LeaveRoomBtn } from "./LeaveRoomBtn";

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
            <LeaveRoomBtn socket={socket}/>
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