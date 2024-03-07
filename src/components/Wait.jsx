import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LeaveRoomBtn } from "./LeaveRoomBtn";
import { SpinnerDotted } from "spinners-react";

export function Wait({ socket }) {

    const navigate = useNavigate();
    const [players, setPlayers] = useState([]);

    const name = localStorage.getItem('userName');
    const code = localStorage.getItem('roomName');

    socket.on('startNewGame', (message, objId) => {
        if (message) {
            navigate('/battlearena');
        }
    });

    socket.on('players-data', (data) => {
        setPlayers(data)
    })


    return (
        <div className="flex flex-col items-center min-h-screen font-irish-grover text-white text-2xl">
            <LeaveRoomBtn socket={socket} />
            <div className="flex flex-col mt-20">
                <div>Welcome <span className="animate-pulse text-4xl">{name}</span>. </div>
                <span>Your Room Code is: <span className="animate-pulse text-4xl">{code}</span></span>
                <div className="flex justify-start">
                    Players:
                    <div className="flex flex-col gap-y-1 ml-2">
                        {players.map((player, index) => {
                            console.log(player, index)
                            return (<p key={index}>{player}</p>)
                        })}
                    </div>
                </div>
            </div>
            <div className="flex items-center mt-20">
                <span className="ml-2 mr-4 text-4xl">Waiting for the host to start the game</span>
                <SpinnerDotted size={40} thickness={200} speed={117} color="rgba(255,255,255, 0.8)" />
            </div>
        </div>
    );

}