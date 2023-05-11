const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const ValidationError = require('../utils/errors/ValidationError');
const NotFoundError = require('../utils/errors/NotFoundError');
const NotAllowedError = require('../utils/errors/NotAllowedError');
const UserExistError = require('../utils/errors/ExistError');

const User = require('../models/user');

const { patchRequestOptions } = require('../utils/utils');
const ERRORS_MESSAGES = require('../utils/ERRORS_MESSAGES');

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password, city, college, gender, status,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, email, password: hash, city, college, gender, status,
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
    name, email, city, college, gender, status, password,
  } = req.body;
  User.findByIdAndUpdate(req.user._id, {
    name, email, city, college, gender, status, password,
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
  User.findById(req.params.userId)
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  User.find({ _id: { $ne: req.user._id } })
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getFriends = (req, res, next) => {
  User.findById(req.user._id).then(
    (user) => {
      User.find({ _id: { $in: user?.friends } })
        .then((friends) => res.send(friends))
        .catch(next);
    },
  );
};

module.exports.searchUser = (req, res, next) => {
  User.find({ name: req.params.search })
    .then((user) => res.send(user))
    .catch(next);
};
module.exports.addToFriendsById = (req, res, next) => {
  if (req.user._id === req.params.userId) throw new NotAllowedError('С самим собой неинтересно');
  User.findByIdAndUpdate(
    req.user._id,
    { $addToSet: { friends: req.params.userId } },
    patchRequestOptions,
  ).then((user) => {
    if (!user) {
      throw new NotFoundError(ERRORS_MESSAGES.NOT_FOUND);
    } else {
      res.send(user);
    }
  })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError(ERRORS_MESSAGES.CHECK_REQ_DATA));
        return;
      }
      if (err instanceof mongoose.Error.CastError) {
        next(new ValidationError(ERRORS_MESSAGES.NOT_FOUND));
        return;
      }
      next(err);
    });
};

module.exports.removeFromFriendsById = (req, res, next) => {
  User.findByIdAndUpdate(
    req.user._id,
    { $pull: { friends: req.params.userId } },
    patchRequestOptions,
  ).then((user) => {
    if (!user) {
      throw new NotFoundError(ERRORS_MESSAGES.NOT_FOUND);
    } else {
      res.send(user);
    }
  })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError(ERRORS_MESSAGES.CHECK_REQ_DATA));
        return;
      }
      if (err instanceof mongoose.Error.CastError) {
        next(new ValidationError(ERRORS_MESSAGES.NOT_FOUND));
        return;
      }
      next(err);
    });
};
