const mongoose = require('mongoose');
const validator = require('validator');
const ERRORS_MESSAGES = require('../utils/ERRORS_MESSAGES');
const { urlValidatorConfig } = require('../utils/utils');

const { Schema } = mongoose;

const movieSchema = new Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v, urlValidatorConfig);
      },
      message: ERRORS_MESSAGES.URL_REQUIRED,
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator(v) {
        return validator.isURL(v, urlValidatorConfig);
      },
      message: ERRORS_MESSAGES.URL_REQUIRED,
    },
  },
  thumbnail: {
    type: String,
    required: true,
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
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
