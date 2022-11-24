const mongoose = require("mongoose");
const ValidationError = require("../utils/errors/ValidationError");
const NotFoundError = require("../utils/errors/NotFoundError");
const NotAllowedError = require("../utils/errors/NotAllowedError");

const Movie = require("../models/movie");

const { patchRequestOptions } = require("../utils/utils");

module.exports.getAllMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const { name, link } = req.body;
  const { _id } = req.user;

  Movie.create({
    name,
    link,
    owner: _id,
    likes: [],
    createdAt: new Date(),
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.statusCode) {
        next(err);
        return;
      }
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError("Проверьте правильность введённых данных"));
        return;
      }
      next(err);
    });
};

module.exports.removeMovieById = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError("Такой карточки не существует");
      } else if (req.user._id !== movie.owner._id.toString()) {
        throw new NotAllowedError("у вас нет прав на удаление этой карточки");
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
        next(new NotFoundError("По вашему запросу ничего не найдено"));
        return;
      }
      next(err);
    });
};

module.exports.likeMovieById = (req, res, next) => {
  Movie.findByIdAndUpdate(
    req.params.movieId,
    { $addToSet: { likes: req.user._id } },
    patchRequestOptions
  )
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError("Вы обращаетесь к несуществующей карточке");
      } else {
        res.send(movie);
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError("Проверьте правильность введённых данных"));
        return;
      }
      if (err instanceof mongoose.Error.CastError) {
        next(new ValidationError("По вашему запросу ничего не найдено"));
        return;
      }
      next(err);
    });
};

module.exports.unlikeMovieById = (req, res, next) => {
  Movie.findByIdAndUpdate(
    req.params.movieId,
    { $pull: { likes: req.user._id } },
    patchRequestOptions
  )
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError("Вы обращаетесь к несуществующей карточке");
      } else {
        res.send(movie);
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new ValidationError("Проверьте правильность введённых данных"));
        return;
      }
      if (err instanceof mongoose.Error.CastError) {
        next(new ValidationError("По вашему запросу ничего не найдено"));
        return;
      }
      next(err);
    });
};
