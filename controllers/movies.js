const mongoose = require('mongoose');
const ValidationError = require('../utils/errors/ValidationError');
const NotFoundError = require('../utils/errors/NotFoundError');
const NotAllowedError = require('../utils/errors/NotAllowedError');

const Movie = require('../models/movie');

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
      if (err.statusCode) {
        next(err);
        return;
      }
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError('Проверьте правильность введённых данных'));
        return;
      }
      next(err);
    });
};
module.exports.removeMovieById = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('В коллекции пользователя нет такого фильма');
      } else if (req.user._id !== movie.owner._id.toString()) {
        throw new NotAllowedError('Можно удалять только фильмы из своей коллекции');
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
        next(new NotFoundError('По вашему запросу ничего не найдено'));
        return;
      }
      next(err);
    });
};
