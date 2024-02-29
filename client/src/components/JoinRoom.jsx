import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function JoinRoom({ socket }) {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [roomName, setRoomName] = useState('');
    const [createStatus, setCreateStatus] = useState(true);

    console.log(name, roomName)

    function handleJoin(e) {
        e.preventDefault();
        const lname = localStorage.getItem('userName');
        const lrname = localStorage.getItem('roomName');
        if (name === '' || roomName === '') {
            setCreateStatus('Above fields can not be empty!');
        }
        else if ( (lname === name && lrname === roomName) || (!localStorage.getItem('userName'))) {
            socket.emit('newUser', name, roomName);
            socket.on('newUserDeclined', (message) => {
                setCreateStatus(message)
            })
            socket.on('newUserAccepted', (message, data) => {
                console.log(message, data);
                localStorage.setItem("userName", name);
                localStorage.setItem("roomName", roomName);
                if (data[0] === localStorage.getItem('userName')) {
                    navigate('/startgame')
                } else {
                    navigate('/wait');
                }
            })
            // socket.on('players-data',(data) => {
            //     console.log(data)
            //     if(data[0] === localStorage.getItem('userName')) {
            //         navigate('/battlearena')
            //     } else {

            //     }
            // })
        }
        else {
            setCreateStatus('You are already in a room! Leave the current room and then try again.');
        }
    }


    return (
        <div className="mt-28">
            <form className="flex flex-col items-center mt-28" onSubmit={handleJoin}>
                <input className="mb-3 border-solid border-2 border-black" type="text" name="name" id="name" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                <input className="border-solid border-2 border-black mb-4" type="text" name="code" id="code" placeholder="Room Name" onChange={(e) => setRoomName(e.target.value)} />
                <button className="bg-blue-300 px-2" type="submit">Join</button>
            </form>
            <h2>Socket id : {socket.id}</h2>
            {createStatus && <div>{createStatus}</div>}
        </div>
    )
}