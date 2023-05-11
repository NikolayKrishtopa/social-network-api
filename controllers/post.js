const mongoose = require('mongoose');
const ValidationError = require('../utils/errors/ValidationError');
const NotFoundError = require('../utils/errors/NotFoundError');
const NotAllowedError = require('../utils/errors/NotAllowedError');
const { patchRequestOptions } = require('../utils/utils');

const Post = require('../models/post');
const User = require('../models/user');
const ERRORS_MESSAGES = require('../utils/ERRORS_MESSAGES');

module.exports.getMyPosts = (req, res, next) => {
  const { _id } = req.user;
  Post.find({ owner: _id })
    .then((posts) => res.send(posts.reverse()))
    .catch(next);
};

module.exports.getUsersPosts = (req, res, next) => {
  Post.find({ owner: req.params.userId })
    .then((posts) => res.send(posts.reverse()))
    .catch(next);
};

module.exports.getAllPosts = (req, res, next) => {
  Post.find()
    .then((posts) => res.send(posts.reverse()))
    .catch(next);
};

module.exports.getFriendsPosts = (req, res, next) => {
  User.findById(req.user._id).then((user) => {
    Post.find({ owner: { $in: user?.friends } })
      .then((posts) => res.send(posts.reverse()))
      .catch(next);
  });
};

module.exports.createPost = (req, res, next) => {
  const { _id } = req.user;
  User.findById(req.user._id).then((user) => {
    Post.create({
      ...req.body,
      owner: _id,
      date: Date.now(),
      ownerName: user.name,
    })
      .then((post) => res.send(post))
      .catch((err) => {
        if (err instanceof mongoose.Error.ValidationError) {
          next(new ValidationError(ERRORS_MESSAGES.CHECK_REQ_DATA));
          return;
        }
        next(err);
      });
  });
};
module.exports.removePostById = (req, res, next) => {
  Post.findById(req.params.postId)
    .then((post) => {
      if (!post) {
        throw new NotFoundError(ERRORS_MESSAGES.MOVIE_NOT_FOUND);
      } else if (req.user._id !== post.owner._id.toString()) {
        throw new NotAllowedError(ERRORS_MESSAGES.NOT_ALLOWED_MOVIE);
      } else {
        Post.findByIdAndRemove(req.params.postId)
          .then(() => {
            res.send(post);
          })
          .catch(next);
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new ValidationError(ERRORS_MESSAGES.CHECK_REQ_DATA));
        return;
      }
      next(err);
    });
};

module.exports.likePostById = (req, res, next) => {
  Post.findByIdAndUpdate(
    req.params.postId,
    { $addToSet: { likes: req.user._id } },
    patchRequestOptions,
  )
    .then((post) => {
      if (!post) {
        throw new NotFoundError(ERRORS_MESSAGES.NOT_FOUND);
      } else {
        res.send(post);
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

module.exports.unlikePostById = (req, res, next) => {
  Post.findByIdAndUpdate(
    req.params.postId,
    { $pull: { likes: req.user._id } },
    patchRequestOptions,
  )
    .then((post) => {
      if (!post) {
        throw new NotFoundError(ERRORS_MESSAGES.NOT_FOUND);
      } else {
        res.send(post);
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
