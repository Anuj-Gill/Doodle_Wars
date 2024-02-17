import flask
from flask import Flask, render_template, url_for, request
import pickle
import base64
import json
import numpy as np
from PIL import Image
import re
import io
import tensorflow as tf
import cv2
import random


labels = ['aircraft carrier',
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
 'zigzag']



model = tf.keras.models.load_model('quickdraw.h5', compile=False)


#Initialize the useless part of the base64 encoded image.
init_Base64 = 21;



#Initializing new Flask instance. Find the html template in "templates".
app = flask.Flask(__name__, template_folder='templates')

idx = 0

#First route : Render the initial drawing template
@app.route('/')
def home():
	global idx
	idx = random.choice(range(0,len(labels)))
	return render_template('draw.html',object=labels[idx])




from flask import Flask, request, render_template, jsonify
import numpy as np
import cv2
import base64

from flask_cors import CORS
app = Flask(__name__)
CORS(app)


# Assuming you have defined `model` and `labels` somewhere in your code.

@app.route('/predict', methods=['POST'])
def predict():
    # Accessing data from the request body

    data = request.get_json()
    print(data)
    draw = data['url']
    choice = data['choice']    

#     print(choice)
    idx = choice
#     print(idx)
    
    # Removing the useless part of the url.
    draw = draw[init_Base64:]
    # Decoding
    draw_decoded = base64.b64decode(draw)
    image = np.asarray(bytearray(draw_decoded), dtype="uint8")
    image = cv2.imdecode(image, cv2.IMREAD_GRAYSCALE)
    
    resized = cv2.resize(image, (28, 28), interpolation=cv2.INTER_AREA)

    vect = np.asarray(resized, dtype="uint8")  # Change values greater than 0 to 255

    img = vect.reshape(1, 28, 28, 1).astype('float32')
    out = model.predict(img)
    # label = labels[int(out[0].argmax())]
    score = out[0][idx]
    scale_value = lambda value: value * 10
    score = scale_value(score)

    # Return JSON response
    return jsonify({'score':score})
    

if __name__ == '__main__':
    app.run(debug=True)

