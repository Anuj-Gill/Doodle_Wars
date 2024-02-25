const express = require('express');
const bodyParser = require('body-parser');
const tf = require('@tensorflow/tfjs');
const cv = require('@techstark/opencv-js');
const base64Img = require('base64-img');
const { createCanvas, Image } = require('canvas');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const _random = require('lodash.random');
const cors = require('cors');
const fetch = require('node-fetch-commonjs')

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());

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

app.post('/predict', async (req, res) => {
  try {
    const data = req.body;
    const draw = data.url;
    const choice = data.choice;
    // console.log(draw)
    
    console.log('line 387');
    // const model = await loadModel(); // Load model asynchronously
     
    
    let idx = choice;
    
    // Removing the useless part of the url.
    const base64Data = draw.substring(22);
    console.log(base64Data)
    
    // Convert base64 to image
    const imagePath = `temp/${uuidv4()}.png`;
    base64Img.img(base64Data, 'temp', uuidv4(), async (err, filepath) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: 'Error occurred while processing the image.' });
        return;
      }
      console.log('line 402');
      
      // Read image using OpenCV
      const imgData = fs.readFileSync(filepath);
      const img = await cv.imdecodeAsync(new Uint8Array(imgData));
      
      const resized = img.resize(28, 28);
      
      // Convert image to tensor
      const tensor = tf.tensor(resized.getData()).reshape([1, 28, 28, 1]).toFloat();
      
      // Normalize pixel values
      const normalized = tensor.div(255.0);
      
      // Predict using the model
      // const prediction = model.predict(normalized).arraySync()[0][idx];
      const prediction = 1.0;
      const scaledScore = 1 + prediction * 9; // Scale the score between 1 and 10
      const roundedScore = Math.round(scaledScore);
      console.log('line 420');

      res.json({ score: roundedScore });

      // Remove temporary image file
      fs.unlinkSync(filepath);
    });
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
