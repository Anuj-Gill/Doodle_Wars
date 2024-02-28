import { WhiteBoard } from "./WhiteBoard"
import { useNavigate } from "react-router-dom";

export function BattleArena({socket}) {
    const navigate = useNavigate()

    function handleExit(e) {
        e.preventDefault();
        localStorage.removeItem('userName');
        localStorage.removeItem('roomName');
        navigate('/')
    }
    return(
        <div>
            <button onClick={handleExit}>Leave Room</button>
            <WhiteBoard />
            <h2>Socket id : {socket.id}</h2>
        </div>
    )
}