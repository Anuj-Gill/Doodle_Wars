import { useState } from "react";
import { useNavigate } from "react-router-dom"

export function CreateRoom({socket}) {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [roomName, setRoomName] = useState('');
    const [ createStatus, setCreateStatus ] = useState(true)
    // console.log(name)
    // console.log(roomName)
    console.log(createStatus)

    function handleCreate(e) {
        e.preventDefault();
        
        if(name === '' || roomName === ''){
            setCreateStatus('Above fields can not be empty!')
        }
        else if( (!localStorage.getItem('userName'))) {
            localStorage.setItem("userName",name);
            localStorage.setItem("roomName",roomName);
            socket.emit('newRoom',name, roomName);
            socket.on('newRoomDeclined',(message) => {
                setCreateStatus(message)
            })
            socket.on('newRoomAccepted',(message) => {
                navigate('/startgame');
            })
        } 
        else {
            setCreateStatus('You are already in a room! Leave the current room and then try again.');
        }
    }

    function handleExit(e) {
        e.preventDefault();
        localStorage.removeItem('userName');
        localStorage.removeItem('roomName');
        localStorage.removeItem('score');
        navigate('/')
    }

    return(
        <div>
            <form className="flex flex-col items-center mt-28" onSubmit={handleCreate}>
                <input className="mb-3 border-solid border-2 border-black" type="text" name="name" id="name" placeholder="Name" onChange={(e) => setName(e.target.value)}/>
                <input className="border-solid border-2 border-black mb-4" type="text" name="code" id="code" placeholder="Room Name" onChange={(e) => setRoomName(e.target.value)} />
                <button className="bg-blue-300 px-2" type="submit">Create</button>
            </form>
            <button onClick={handleExit}>Leave Room</button>
            {!createStatus && <div>Invalid Name or RoomName</div>}
            <h2>Socket id : {socket.id}</h2>
            {createStatus  && <div>
                {createStatus}
            </div>}
        </div>
    )
}

