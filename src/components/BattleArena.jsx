import React, { useState, useEffect, useRef } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { LeaveRoomBtn } from './LeaveRoomBtn';

const labels = ['airplane',
    'bicycle',
    'book',
    'bowtie',
    'bucket',
    'butterfly',
    'cake',
    'car',
    'cat',
    'cell phone',
    'clock',
    'crown',
    'eye',
    'face',
    'fish',
    'house',
    'ice cream',
    'light bulb',
    'pizza',
    'river',
    'star',
    'sun',
    't-shirt',
    'tree',
    'windmill'];

export function BattleArena({ socket }) {
    
    const [timer, setTimer] = useState(15);
    const [submitState, setSubmitState] = useState(false);
    const [result, setResult] = useState('');
    const canvasRef = useRef(null);
    const [coordinates, setCoordinates] = useState([]);
    const [objectName, setObjectName] = useState('');
    const [objId, setObjId] = useState('');
    const [roomCode, setRoomCode] = useState(localStorage.getItem('roomName'));
    const [winner, setWinner] = useState('');
    const [adminName, setAdminName] = useState(false);
    const [gameState, setGameState] = useState('running'); // New state for game state
    let isDragging = false;
    let lastX, lastY;
    console.log(gameState)
    // Function to handle exiting the room


    



    // Function to handle clearing the canvas
    const handleClear = () => {
        setResult(false);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };


    // Function to handle drawing submission
    const handleSubmit = () => {
        socket.emit('reqAdminName', localStorage.getItem('roomName'));
        const canvas = canvasRef.current;
        // const ctx = canvas.getContext('2d');
        // console.log(canvas.toDataURL());
        const handleFetch = async () => {
            const req = await fetch('https://3526-34-80-73-160.ngrok-free.app/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({ img: canvas.toDataURL(), object_idx: objId })
            });
            const res = await req.json();
            console.log(res)
            setResult(res.score);
            localStorage.setItem('score', res.score)
            socket.emit('userScore', localStorage.getItem('userName'), localStorage.getItem('roomName'), localStorage.getItem('score'));
            setTimeout(() => {
                socket.emit('getWinnerName', localStorage.getItem('roomName'));
            }, 1000);

        };
        handleFetch();
    };

    socket.on('winnerName', winnerName => {
        setWinner(winnerName);
        console.log(winner)
    })

    socket.on('resIsAdmin', (response) => {
        if (response === localStorage.getItem('userName')) {
            setAdminName(true);
        } else {
            setAdminName(false);
        }
    });

    // Effect to initialize the canvas and set event listeners
    useEffect(() => {
        const canvas = canvasRef.current;
        // const ctx = canvas.getContext('2d');

        // Event handlers for mouse actions
        const handleMouseDown = (e) => {
            isDragging = true;
            const canvas = canvasRef.current;
            const rect = canvas.getBoundingClientRect();
            lastX = e.clientX - rect.left;
            lastY = e.clientY - rect.top;
        };

        const handleMouseMove = (e) => {
            if (isDragging) {
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');
                const rect = canvas.getBoundingClientRect();

                const currentX = e.clientX - rect.left;
                const currentY = e.clientY - rect.top;

                draw(lastX, lastY, currentX, currentY);


                lastX = currentX;
                lastY = currentY;
            }
        };

        const handleMouseUp = () => {
            isDragging = false;
        };

        const draw = (startX, startY, endX, endY) => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext('2d');

            // Scale the coordinates based on the actual canvas size and the displayed size
            const scaleX = canvas.width / canvas.offsetWidth;
            const scaleY = canvas.height / canvas.offsetHeight;

            // Adjust the coordinates based on the scale
            startX *= scaleX;
            startY *= scaleY;
            endX *= scaleX;
            endY *= scaleY;

            ctx.beginPath();
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 2;
            ctx.moveTo(startX, startY);
            ctx.lineTo(endX, endY);
            ctx.stroke();
        };


        const handleTouchMove = (e) => {
            e.preventDefault();
            const rect = canvas.getBoundingClientRect();
            const touch = e.touches[0];
            const currentX = touch.clientX - rect.left;
            const currentY = touch.clientY - rect.top;
            draw(lastX, lastY, currentX, currentY);
            lastX = currentX;
            lastY = currentY;
        };


        const handleTouchStart = (e) => {
            e.preventDefault();
            const rect = canvas.getBoundingClientRect();
            const touch = e.touches[0];
            lastX = touch.clientX - rect.left;
            lastY = touch.clientY - rect.top;
        };

        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseup', handleMouseUp);

        canvas.addEventListener('touchstart', handleTouchStart);
        canvas.addEventListener('touchmove', handleTouchMove);

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseup', handleMouseUp);

            canvas.removeEventListener('touchstart', handleTouchStart);
            canvas.removeEventListener('touchmove', handleTouchMove);
        };
    }, [gameState]);


    // Effect to select a random object to draw
    useEffect(() => {
        if (gameState === 'running') {
            console.log('obj id before requesting', objId);
            socket.emit('requestObjId', localStorage.getItem('roomName'));
            socket.on('sendingObjId', (objNum) => {
                console.log(objNum, 'battleArena line 461')
                setObjId(objNum)
                console.log(objId, 'line 463')
                const label = labels[objNum];
                console.log('line 465', label)
                setObjectName(label);
            });
        }
    }, [gameState]);

    console.log('object id after requesting', objId)

    useEffect(() => {
        if (gameState === 'running') {
            const intervalId = setInterval(() => {
                setTimer((timer) => {
                    if (timer > 0) {
                        return timer - 1;
                    } else {
                        clearInterval(intervalId);
                        setSubmitState(true);
                        return 0;
                    }
                });
            }, 1000);
            return () => clearInterval(intervalId);
        }
    }, [gameState]);

    // Effect to handle submission when submitState changes
    useEffect(() => {
        if (submitState) {
            handleSubmit();
            setGameState('idle'); // Set game state to idle after submission
        }
    }, [submitState]);

    useEffect(() => {
        socket.on('startNewGame', () => {
            setTimer(15); // Reset timer
            setSubmitState(false); // Reset submission state
            setResult(0); // Reset result
            setGameState('running'); // Start a new game
            setWinner(''); // Reset winner
            handleClear(); // Clear the canvas
            // Reset any other necessary state variables
        });

        // Clean up the event listener when the component unmounts
        return () => {
            socket.off('startNewGame');
        };
    }, [socket, handleClear]);

    const handlePlayAgain = () => {
        console.log('start new game req sent!!')
        socket.emit('startNewGame', localStorage.getItem('roomName'));
        socket.emit('generateObjId', localStorage.getItem('roomName'));
        setTimer(15); // Reset timer
        setSubmitState(false); // Reset submission state
        setResult(0); // Reset result
        setGameState('running'); // Start a new game
        setWinner(''); // Reset winner
        handleClear(); // Clear the canvas
    };


    return (
        <div className="flex flex-col items-center justify-center min-h-screen font-irish-grover text-white text-2xl pt-16">
            <LeaveRoomBtn socket={socket} />
            <h2 className="">Room Code: <span className="animate-pulse text-4xl">{roomCode}</span></h2>
            <div className="flex flex-col justify-center items-center w-full md:flex-row md:items-start">
                {winner ? (
                    <div className="flex flex-col justify-around align-middle w-full md:w-auto p-2">
                        <div>
                            <h3 className="text-4xl">Leaderboard</h3>
                        </div>
                        <div>
                            {Object.entries(winner).map(([key, value], index) => (
                                <div key={index}>
                                    <span>{index + 1}: </span>
                                    <span>{key}: </span>
                                    <span>{value}</span>
                                </div>
                            ))}
                        </div>
                        {adminName && <button onClick={handlePlayAgain}>Play Again</button>}
                    </div>
                ) : (
                    <div className="flex flex-col-reverse items-center p-2 ">
                        <div className="flex flex-col items-center mb-8 md:mb-0">
                            <div className="p-4">You have to draw a <span className="text-4xl">{objectName}</span></div>
                            <canvas
                                ref={canvasRef}
                                id="canvas"
                                className="border-2 border-black border-solid bg-white mb-5 justify-self-center"
                                style={{ height: `350px`, width: `100%`, maxWidth: `350px` }}
                            ></canvas>
                            <div className="flex flex-col mb-5 items-center">
                                <button
                                    className="px-6 py-2 mb-4 sm:mb-0 sm:mr-4 bg-white font-irish-grover text-blue-900 rounded-md hover:text-white hover:bg-blue-900 transition-colors duration-300 font-bold"
                                    onClick={handleClear}
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
                        <div className="ml-8 p-2">
                            <div className="p-1">Timer: <span className="text-4xl p-4">{timer}</span> seconds</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}