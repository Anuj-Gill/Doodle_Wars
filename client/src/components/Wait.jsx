import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Wait({ socket }) {

    const navigate = useNavigate();
    const [startStatus, setStartStatus] = useState(false);

    socket.on('enterGame', (message) => {
        console.log('got the message in waiting',message)
        setStartStatus(message);
        navigate('/battlearena');
        
    });

    return(
        <div>
            {!startStatus && <div>
            Waiting for the host to start game....
            </div>}
            {startStatus && <div>Entering the room</div>}
        </div>
    )
}