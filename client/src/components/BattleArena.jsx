import React, { useState, useEffect } from 'react';
import { WhiteBoard } from './WhiteBoard';
import { useNavigate } from 'react-router-dom';

export function BattleArena({ socket }) {
    const navigate = useNavigate();
    const [timer, setTimer] = useState(5); 
    const [submitState, setSubmitState] = useState(false)

    // Function to handle exiting the room
    function handleExit(e) {
        e.preventDefault();
        localStorage.removeItem('userName');
        localStorage.removeItem('roomName');
        navigate('/');
    }

    // Effect to start and update the timer
    useEffect(() => {
        // Start the timer when the component mounts
        const intervalId = setInterval(() => {
            setTimer(prevTimer => {
                if (prevTimer > 0) {
                    return prevTimer - 1; // Decrement timer by 1 second
                } else {
                    clearInterval(intervalId); // Stop the timer when it reaches 0
                    setSubmitState(true)
                    return 0;
                }
            });
        }, 1000); // Run the interval every second

        // Cleanup function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, []); // Empty dependency array to run the effect only once when the component mounts

    return (
        <div>
            <button onClick={handleExit}>Leave Room</button>
            <WhiteBoard state={submitState} socket={socket}/>
            <h2>Socket id: {socket.id}</h2>
            <div>Timer: {timer} seconds</div>
        </div>
    );
}
