import { useNavigate } from "react-router-dom";

export function LeaveRoomBtn({socket}) {

    const navigate = useNavigate();
    
    function handleExit(e) {
        e.preventDefault();
        socket.emit('userLeft', localStorage.getItem('userName'), localStorage.getItem('roomName'));
        localStorage.removeItem('userName');
        localStorage.removeItem('roomName');
        localStorage.removeItem('score');
        navigate('/');
    }

    return(
        <button className="absolute top-2 right-1 px-6 py-2 mb-4 sm:mb-0 sm:mr-1 bg-white font-irish-grover text-blue-900 rounded-md transition-colors duration-300 font-bold hover:text-white hover:bg-blue-900" onClick={handleExit}>Leave Room</button>
    )
}