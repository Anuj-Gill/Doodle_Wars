import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LeaveRoomBtn } from "./LeaveRoomBtn";

export function JoinRoom({ socket }) {

    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [roomName, setRoomName] = useState('');
    const [createStatus, setCreateStatus] = useState(true);

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
        }
        else {
            setCreateStatus('You are already in a room! Leave the current room and then try again.');
        }
    }

    function handleExit(e) {
        e.preventDefault();
        socket.emit('userLeft',localStorage.getItem('userName'), localStorage.getItem('roomName'));
        localStorage.removeItem('userName');
        localStorage.removeItem('roomName');
        localStorage.removeItem('score');
        navigate('/')
    }


    return (
        <div className="flex flex-col items-center justify-around  min-h-screen">
            <LeaveRoomBtn socket={socket}/>
            <div className="">
                <h1 className="mt-10 text-6xl font-bold font-irish-grover text-white  sm:text-6xl md:text-8xl">Doodle Wars</h1>
            </div>
            <form className="flex flex-col items-center -mt-10 " onSubmit={handleJoin}>
                <input className="font-black font-irish-grover text-lg mb-3 border-solid border-2 border-black p-1 w-11/12 rounded-md" type="text" name="name" id="name" placeholder="Name" onChange={(e) => setName(e.target.value)} />
                <input className="font-black  border-solid border-2 border-black mb-4 rounded-md p-1 w-11/12" type="text" name="code" id="code" placeholder="Room Name" onChange={(e) => setRoomName(e.target.value)} />
                <button className="px-6 py-2 mb-4 sm:mb-0 sm:mr-4 bg-white font-irish-grover text-blue-900 rounded-md hover:text-white hover:bg-blue-900 transition-colors duration-300 font-bold" type="submit">Join Room</button>
            </form>
            {!createStatus && <div className="text-white animate-bounce"> Invalid Name or RoomName</div>}
            {createStatus && <div className="text-white font-mono text-3xl font-semibold animate-bounce pb-16">
                {createStatus}
            </div>}
        </div>
    )
}