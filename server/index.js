const express = require('express');
const bodyParser = require('body-parser');
const tf = require('@tensorflow/tfjs');
const cv = require('@techstark/opencv-js');
const base64Img = require('base64-img');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const _random = require('lodash.random');
const cors = require('cors');
const fetch = require('node-fetch-commonjs');

const app = express();

const http = require('http').Server(app);
const PORT = 3000;

app.use(cors())  
const socketIO = require('socket.io')(http,{
  cors : {
    origin: 'http://localhost:5173'
  }
  })

//Socket Logic
socketIO.on('connection', (socket) => {
  console.log(`New connection: ${socket.id}`);
  socket.on('disconnect',() => {
    console.log("a user dissonncted!!")
  })
})

// Load model and labels
async function loadModel() {
  // const path = require('path');
  // const modelPath = path.join(__dirname, 'model.json');
  // const model = await tf.loadLayersModel('file:Doodle_Wars/server/model.json');
  return 7;
}

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
'zigzag'];

const initBase64 = 21;

app.use(bodyParser.json());

let idx = 0;

app.get('/', (req, res) => {
  res.send('hii')
});

const sharp = require('sharp');

app.post('/predict', async (req, res) => {
  try {
    const data = req.body;
    const draw = data.url;
    const choice = data.choice;

    let idx = choice;

    // Extract base64 data from the URL (assuming it starts with "data:image/png;base64,")
    const base64Data = draw.replace(/^data:image\/\w+;base64,/, '');

    // Decode base64 data and process image using sharp
    const buffer = Buffer.from(base64Data, 'base64');
    const metadata = await sharp(buffer).metadata();
    const image = await sharp(buffer)
      .resize(metadata.width, metadata.height) // Resize if necessary
      .raw() // Get raw pixel data
      .toBuffer();

    // Convert raw pixel data to tensor
    const tensor = tf.tensor(image, [1, metadata.height, metadata.width, 4]).toFloat();

    // Normalize pixel values
    const normalized = tensor.div(255.0);

    // Predict using the model
    // const prediction = model.predict(normalized).arraySync()[0][idx];
    const prediction = 1.0;
    const scaledScore = 1 + prediction * 9; // Scale the score between 1 and 10
    const roundedScore = Math.round(scaledScore);

    res.json({ score: roundedScore });
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});



http.listen(5000)
