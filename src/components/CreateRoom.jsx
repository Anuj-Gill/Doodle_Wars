import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LeaveRoomBtn } from "./LeaveRoomBtn";
import logo from '../assets/logo.jpeg';

export function CreateRoom({ socket }) {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [roomName, setRoomName] = useState('');
    const [createStatus, setCreateStatus] = useState(true)

    function handleCreate(e) {
        e.preventDefault();

        if (name === '' || roomName === '') {
            setCreateStatus('Above fields can not be empty!')
        }
        else if ((!localStorage.getItem('userName'))) {
            socket.emit('newRoom', name, roomName);
            socket.on('newRoomDeclined', (message) => {
                setCreateStatus(message)
            })
            socket.on('newRoomAccepted', (message) => {
                localStorage.setItem("userName", name);
                localStorage.setItem("roomName", roomName);
                navigate('/startgame');
            })
        }
        else {
            setCreateStatus('You are already in a room! Leave the current room and then try again.');
        }
    }


    console.log(socket.id);

    return (
        <div className="flex flex-col items-center justify-around  min-h-screen">
            <LeaveRoomBtn socket={socket} />
            <div className='flex flex-col justify-end items-center md:flex-row '>
                <img src={logo} className='h-36 w-36 animate-spin-slow mr-10 rounded-full'></img>
                <h1 className="text-6xl font-bold text-white sm:text-6xl md:text-8xl font-irish-grover">
                    Doodle Wars
                </h1>
            </div>
            <form className="flex flex-col items-center -mt-10 " onSubmit={handleCreate}>
                <input className="font-black font-irish-grover text-lg mb-3 border-solid border-2 border-black p-1 w-11/12 rounded-md placeholder-gray-400 " type="text" name="name" id="name" placeholder="Name" onChange={(e) => setName(e.target.value)} />

                <input className="font-black  border-solid border-2 border-black mb-4 rounded-md p-1 w-11/12" type="text" name="code" id="code" placeholder="Room Name" onChange={(e) => setRoomName(e.target.value)} />
                <button className="px-6 py-2 sm:mb-0 sm:mr-4 bg-white font-irish-grover text-blue-900 rounded-md transition-colors duration-300 font-bold hover:text-white hover:bg-blue-900" type="submit">Create Room</button>
            </form>
            {!createStatus && <div className="text-white animate-bounce"> Invalid Name or RoomName</div>}
            {createStatus && <div className="text-white font-mono text-3xl font-semibold animate-bounce pb-16">
                {createStatus}
            </div>}
        </div>
    )
}

