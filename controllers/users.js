const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const ValidationError = require('../utils/errors/ValidationError');
const NotFoundError = require('../utils/errors/NotFoundError');
const UserExistError = require('../utils/errors/ExistError');

const User = require('../models/user');

const { patchRequestOptions } = require('../utils/utils');
const ERRORS_MESSAGES = require('../utils/ERRORS_MESSAGES');

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password, city, college,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash, city, college,
    }))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError(ERRORS_MESSAGES.VALIDATION));
      } else if (err.code === 11000) {
        next(new UserExistError(ERRORS_MESSAGES.USER_EXISTS));
      } else {
        next(err);
      }
    });
};

module.exports.updateProfile = (req, res, next) => {
  const {
    name, email, city, college,
  } = req.body;
  User.findByIdAndUpdate(req.user._id, {
    name, email, city, college,
  }, patchRequestOptions)
    .then((user) => {
      if (!user) {
        throw new NotFoundError(ERRORS_MESSAGES.CHECK_REQ_DATA);
      }
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError(ERRORS_MESSAGES.CHECK_REQ_DATA));
      } else if (err instanceof mongoose.Error.CastError) {
        next(new ValidationError(ERRORS_MESSAGES.NOT_FOUND));
      } else {
        next(err);
      }
    });
};

module.exports.getMyProfile = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.getUserProfile = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find()
    .then((user) => res.send(user))
    .catch(next);
};
module.exports.searchUser = (req, res, next) => {
  User.findOne({ name: req.params.search })
    .then((user) => res.send(user))
    .catch(next);
};
