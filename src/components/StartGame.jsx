import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

export function StartGame({ socket }) {

    const navigate = useNavigate();
    const [players, setPlayers] = useState([]);
    

    const name = localStorage.getItem('userName');
    const code = localStorage.getItem('roomName');

    function handleExit(e) {
        e.preventDefault();
        localStorage.removeItem('userName');
        localStorage.removeItem('roomName');
        socket.emit('userLeft',(name,code));
        navigate('/');
    }

    function handleStart(e) {
        e.preventDefault();
        socket.emit('startNewGame', localStorage.getItem('roomName'));
        socket.emit('generateObjId',localStorage.getItem('roomName'));
        navigate('/battlearena');
    }

    // setInterval(() => {
    //     console.log('data requested')
    //     socket.emit('request-data', localStorage.getItem('roomName'));
    // },5000)

    useEffect(() => {
        socket.emit('req-players-data',localStorage.getItem('roomName'));
    },[])

    socket.on('players-data',(data) => {
        console.log('got players data: ',data)
        setPlayers(data)
        console.log(players);
    })
    console.log(players);


    return (
        <div className="flex flex-col">
            {name && <div>
                <div>Welcome {name}. Your Room Code is: {code}</div>
                Players:
                {players.map((player, index) => {
                    console.log(player,index)
                        return(<p key={index}>{player}</p>)
                })}
                <button onClick={handleStart}>Start Game</button>
                <button onClick={handleExit}>Leave Room</button>
                <h2>Socket id : {socket.id}</h2></div>
            }
            {!name && <div>
            <h2>Looks like you haven't registered yet. Please register first!! <button onClick={() => navigate('/')}>Home</button></h2>    
            </div>}
        </div>
    )
}