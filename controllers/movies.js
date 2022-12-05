const mongoose = require('mongoose');
const ValidationError = require('../utils/errors/ValidationError');
const NotFoundError = require('../utils/errors/NotFoundError');
const NotAllowedError = require('../utils/errors/NotAllowedError');

const Movie = require('../models/movie');
const ERRORS_MESSAGES = require('../utils/ERRORS_MESSAGES');

module.exports.getUserMovies = (req, res, next) => {
  const { _id } = req.user;
  Movie.find({ owner: _id })
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const { _id } = req.user;

  Movie.create({
    ...req.body,
    owner: _id,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError(ERRORS_MESSAGES.CHECK_REQ_DATA));
        return;
      }
      next(err);
    });
};
module.exports.removeMovieById = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(ERRORS_MESSAGES.MOVIE_NOT_FOUND);
      } else if (req.user._id !== movie.owner._id.toString()) {
        throw new NotAllowedError(ERRORS_MESSAGES.NOT_ALLOWED_MOVIE);
      } else {
        Movie.findByIdAndRemove(req.params.movieId)
          .then(() => {
            res.send(movie);
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
