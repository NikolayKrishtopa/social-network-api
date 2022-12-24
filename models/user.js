const validator = require("validator");
const mongoose = require("mongoose");
const { findUserBeCredentials } = require("../utils/utils");
const ERRORS_MESSAGES = require("../utils/ERRORS_MESSAGES");

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
  },
  {
    toObject: { useProjection: true },
    toJSON: { useProjection: true },
  }
);

userSchema.statics.findUserByCredentials = findUserBeCredentials;

module.exports = mongoose.model("user", userSchema);
