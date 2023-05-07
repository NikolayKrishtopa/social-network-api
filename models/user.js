const validator = require('validator');
const mongoose = require('mongoose');
const { findUserBeCredentials, urlValidatorConfig } = require('../utils/utils');
const ERRORS_MESSAGES = require('../utils/ERRORS_MESSAGES');

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator(v) {
          return validator.isEmail(v);
        },
        message: ERRORS_MESSAGES.EMAIL_REQUIRED,
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    city: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    college: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    friends: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    }],
    avatar: {
      type: String,
      default: 'https://cs12.pikabu.ru/post_img/2022/10/24/2/1666571824193118478.webp',
      validate: {
        validator(v) {
          return validator.isURL(v, urlValidatorConfig);
        },
        message: 'Недопустимый формат ввода. Введите URL адрес',
      },
    },
  },
  {
    toObject: { useProjection: true },
    toJSON: { useProjection: true },
  },
);

userSchema.statics.findUserByCredentials = findUserBeCredentials;

module.exports = mongoose.model('user', userSchema);
