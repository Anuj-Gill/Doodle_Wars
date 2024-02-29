import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const labels = ['aircraft carrier',
  'airplane',
  'alarm clock',
  'ambulance',
  'angel',
  'animal migration',
  'ant',
  'anvil',
  'apple',
  'arm',
  'asparagus',
  'axe',
  'backpack',
  'banana',
  'bandage',
  'barn',
  'baseball bat',
  'baseball',
  'basket',
  'basketball',
  'bat',
  'bathtub',
  'beach',
  'bear',
  'beard',
  'bed',
  'bee',
  'belt',
  'bench',
  'bicycle',
  'binoculars',
  'bird',
  'birthday cake',
  'blackberry',
  'blueberry',
  'book',
  'boomerang',
  'bottlecap',
  'bowtie',
  'bracelet',
  'brain',
  'bread',
  'bridge',
  'broccoli',
  'broom',
  'bucket',
  'bulldozer',
  'bus',
  'bush',
  'butterfly',
  'cactus',
  'cake',
  'calculator',
  'calendar',
  'camel',
  'camera',
  'camouflage',
  'campfire',
  'candle',
  'cannon',
  'canoe',
  'car',
  'carrot',
  'castle',
  'cat',
  'ceiling fan',
  'cell phone',
  'cello',
  'chair',
  'chandelier',
  'church',
  'circle',
  'clarinet',
  'clock',
  'cloud',
  'coffee cup',
  'compass',
  'computer',
  'cookie',
  'cooler',
  'couch',
  'cow',
  'crab',
  'crayon',
  'crocodile',
  'crown',
  'cruise ship',
  'cup',
  'diamond',
  'dishwasher',
  'diving board',
  'dog',
  'dolphin',
  'donut',
  'door',
  'dragon',
  'dresser',
  'drill',
  'drums',
  'duck',
  'dumbbell',
  'ear',
  'elbow',
  'elephant',
  'envelope',
  'eraser',
  'eye',
  'eyeglasses',
  'face',
  'fan',
  'feather',
  'fence',
  'finger',
  'fire hydrant',
  'fireplace',
  'firetruck',
  'fish',
  'flamingo',
  'flashlight',
  'flip flops',
  'floor lamp',
  'flower',
  'flying saucer',
  'foot',
  'fork',
  'frog',
  'frying pan',
  'garden hose',
  'garden',
  'giraffe',
  'goatee',
  'golf club',
  'grapes',
  'grass',
  'guitar',
  'hamburger',
  'hammer',
  'hand',
  'harp',
  'hat',
  'headphones',
  'hedgehog',
  'helicopter',
  'helmet',
  'hexagon',
  'hockey puck',
  'hockey stick',
  'horse',
  'hospital',
  'hot air balloon',
  'hot dog',
  'hot tub',
  'hourglass',
  'house plant',
  'house',
  'hurricane',
  'ice cream',
  'jacket',
  'jail',
  'kangaroo',
  'key',
  'keyboard',
  'knee',
  'knife',
  'ladder',
  'lantern',
  'laptop',
  'leaf',
  'leg',
  'light bulb',
  'lighter',
  'lighthouse',
  'lightning',
  'line',
  'lion',
  'lipstick',
  'lobster',
  'lollipop',
  'mailbox',
  'map',
  'marker',
  'matches',
  'megaphone',
  'mermaid',
  'microphone',
  'microwave',
  'monkey',
  'moon',
  'mosquito',
  'motorbike',
  'mountain',
  'mouse',
  'moustache',
  'mouth',
  'mug',
  'mushroom',
  'nail',
  'necklace',
  'nose',
  'ocean',
  'octagon',
  'octopus',
  'onion',
  'oven',
  'owl',
  'paint can',
  'paintbrush',
  'palm tree',
  'panda',
  'pants',
  'paper clip',
  'parachute',
  'parrot',
  'passport',
  'peanut',
  'pear',
  'peas',
  'pencil',
  'penguin',
  'piano',
  'pickup truck',
  'picture frame',
  'pig',
  'pillow',
  'pineapple',
  'pizza',
  'pliers',
  'police car',
  'pond',
  'pool',
  'popsicle',
  'postcard',
  'potato',
  'power outlet',
  'purse',
  'rabbit',
  'raccoon',
  'radio',
  'rain',
  'rainbow',
  'rake',
  'remote control',
  'rhinoceros',
  'rifle',
  'river',
  'roller coaster',
  'rollerskates',
  'sailboat',
  'sandwich',
  'saw',
  'saxophone',
  'school bus',
  'scissors',
  'scorpion',
  'screwdriver',
  'sea turtle',
  'see saw',
  'shark',
  'sheep',
  'shoe',
  'shorts',
  'shovel',
  'sink',
  'skateboard',
  'skull',
  'skyscraper',
  'sleeping bag',
  'smiley face',
  'snail',
  'snake',
  'snorkel',
  'snowflake',
  'snowman',
  'soccer ball',
  'sock',
  'speedboat',
  'spider',
  'spoon',
  'spreadsheet',
  'square',
  'squiggle',
  'squirrel',
  'stairs',
  'star',
  'steak',
  'stereo',
  'stethoscope',
  'stitches',
  'stop sign',
  'stove',
  'strawberry',
  'streetlight',
  'string bean',
  'submarine',
  'suitcase',
  'sun',
  'swan',
  'sweater',
  'swing set',
  'sword',
  'syringe',
  't-shirt',
  'table',
  'teapot',
  'teddy-bear',
  'telephone',
  'television',
  'tennis racquet',
  'tent',
  'The Eiffel Tower',
  'The Great Wall of China',
  'The Mona Lisa',
  'tiger',
  'toaster',
  'toe',
  'toilet',
  'tooth',
  'toothbrush',
  'toothpaste',
  'tornado',
  'tractor',
  'traffic light',
  'train',
  'tree',
  'triangle',
  'trombone',
  'truck',
  'trumpet',
  'umbrella',
  'underwear',
  'van',
  'vase',
  'violin',
  'washing machine',
  'watermelon',
  'waterslide',
  'whale',
  'wheel',
  'windmill',
  'wine bottle',
  'wine glass',
  'wristwatch',
  'yoga',
  'zebra',
  'zigzag'
];

export function BattleArena({ socket }) {
    const navigate = useNavigate();
    const [timer, setTimer] = useState(5);
    const [submitState, setSubmitState] = useState(false);
    const [result, setResult] = useState(false);
    const canvasRef = useRef(null);
    const [coordinates, setCoordinates] = useState([]);
    const [object, setObject] = useState('');
    const [objId, setObjId] = useState('');
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
            console.log('req sent');
            const req = await fetch('http://localhost:5000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json'
                },
                body: JSON.stringify({ url: canvas.toDataURL(), choice: objId })
            });
            const res = await req.json();
            console.log('res received');
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
        socket.emit('requestObjId',localStorage.getItem('roomName'));
        const canvas = canvasRef.current;
        socket.on('sendingObjId',(objNum) => {
            console.log(objNum,'battleArena line 459')
            const label = labels[objNum];
            setObject(label);
            console.log(label);
        })
    }, []);

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
            <button onClick={handleExit}>Leave Room</button>
            <div className='flex flex-col justify-center items-center'>
                <div className='p-4'>You have to draw a {object}</div>
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