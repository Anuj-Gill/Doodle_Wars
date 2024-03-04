import React, { useState, useEffect, useRef } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

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
    const navigate = useNavigate();
    const [timer, setTimer] = useState(60);
    const [submitState, setSubmitState] = useState(false);
    const [result, setResult] = useState(false);
    const canvasRef = useRef(null);
    const [coordinates, setCoordinates] = useState([]);
    const [objectName, setObjectName] = useState('');
    const [objId, setObjId] = useState(0);
    const [roomCode, setRoomCode] = useState(localStorage.getItem('roomName'));
    let isDragging = false;
    let lastX, lastY;



    // Function to handle exiting the room
    function handleExit(e) {
        e.preventDefault();
        localStorage.removeItem('userName');
        localStorage.removeItem('roomName');
        navigate('/');
    }

    // Function to handle clearing the canvas
    const handleClear = () => {
        setResult(false);
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    // Function to handle drawing submission
    const handleSubmit = () => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        console.log(canvas.toDataURL());
        const handleFetch = async () => {
            const req = await fetch('https://cb24-2409-4081-2c13-e7fc-a479-c22-2e32-663b.ngrok-free.app/predict', {
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
            localStorage.setItem('score', result);
        };
        handleFetch();
    };

    // Effect to initialize the canvas and set event listeners
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        canvas.addEventListener('mousedown', handleMouseDown);
        canvas.addEventListener('mousemove', handleMouseMove);
        canvas.addEventListener('mouseup', handleMouseUp);

        return () => {
            canvas.removeEventListener('mousedown', handleMouseDown);
            canvas.removeEventListener('mousemove', handleMouseMove);
            canvas.removeEventListener('mouseup', handleMouseUp);
        };
    }, [canvasRef]);



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

            ctx.beginPath();
            ctx.strokeStyle = 'red';
            ctx.lineWidth = 2;
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(currentX, currentY);
            ctx.stroke();

            lastX = currentX;
            lastY = currentY;
        }
    };

    const handleMouseUp = () => {
        isDragging = false;
    };

    // Effect to select a random object to draw
    useEffect(() => {

        console.log('obj id before requesting', objId)
        console.log('requestingObjId')
        socket.emit('requestObjId', localStorage.getItem('roomName'));
        socket.on('sendingObjId', (objNum) => {
            console.log(objNum, 'battleArena line 461')
            setObjId(objNum)
            console.log(objId, 'line 463')
            const label = labels[objNum];
            console.log('line 465', label)
            setObjectName(label);
        })
        

        // return() => clearInterval()
    }, []);
    console.log('object id after requesting', objId)





    useEffect(() => {
        const intervalId = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer > 0) {
                    return prevTimer - 1;
                } else {
                    clearInterval(intervalId);
                    setSubmitState(true);
                    return 0;
                }
            });
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    // Effect to handle submission when submitState changes
    useEffect(() => {
        if (submitState) {
            handleSubmit();
        }
    }, [submitState]);

    return (
        <div>
            <h2>Room Code: {roomCode}</h2>
            <button onClick={handleExit}>Leave Room</button>
            {players}
            <div className='flex flex-col justify-center items-center'>
                <div className='p-4'>You have to draw a {objectName}</div>
                <canvas
                    ref={canvasRef}
                    id='canvas'
                    className='border-2 border-black border-solid bg-white mb-5'
                    height={100}
                    width={100}></canvas>
                <div className='flex flex-col mb-5'>
                    <div className='flex justify-end'>
                        <button className='bg-white mr-10 p-1' onClick={handleClear}>
                            Clear
                        </button>
                    </div>
                </div>
                {result && <div>Score: {result}</div>}
                <div>Timer: {timer} seconds</div>
            </div>
        </div>
    );
}