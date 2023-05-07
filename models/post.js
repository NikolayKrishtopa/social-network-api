const mongoose = require('mongoose');
const validator = require('validator');
const ERRORS_MESSAGES = require('../utils/ERRORS_MESSAGES');
const { urlValidatorConfig } = require('../utils/utils');

const { Schema } = mongoose;

const postSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator(v) {
        return validator.isURL(v, urlValidatorConfig);
      },
      message: ERRORS_MESSAGES.URL_REQUIRED,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  }],
});

module.exports = mongoose.model('post', postSchema);
