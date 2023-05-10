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
      default: 'https://gnatkovsky.com.ua/wp-content/uploads/2015/02/130220152333-180x180.jpg',
      validate: {
        validator(v) {
          return validator.isURL(v, urlValidatorConfig);
        },
        message: 'Недопустимый формат ввода. Введите URL адрес',
      },
    },
    status: {
      type: String,
      default: 'Hi!',
    },
    gender: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
  },
  {
    toObject: { useProjection: true },
    toJSON: { useProjection: true },
  },
);

userSchema.statics.findUserByCredentials = findUserBeCredentials;

module.exports = mongoose.model('user', userSchema);
