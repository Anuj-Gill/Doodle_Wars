import tensorflow as tf
import numpy as np
np.object = np.object_
np.bool = np.bool_
np.int = np.int_
np.float = np.float_
import tensorflowjs as tfjs

model  = tf.keras.models.load_model('quickdraw.h5')
print(model)

tfjs.converters.save_keras_model(model, 'model.json')