import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Wait({ socket }) {

    const navigate = useNavigate();
    const [startStatus, setStartStatus] = useState(false);

    socket.on('startNewGame', (message, objId) => {
        console.log('got the message in waiting',message)
        if(message) {
            navigate('/battlearena');    
        }
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