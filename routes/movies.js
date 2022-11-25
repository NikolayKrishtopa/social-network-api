const routerMovies = require('express').Router();
const {
  getUserMovies,
  createMovie,
  removeMovieById,
} = require('../controllers/movies');

const movieBodyValidator = require('../middlewares/requestValidators/movieBodyValidator');
const movieParamsValidator = require('../middlewares/requestValidators/movieParamsValidator');

routerMovies.get('/', getUserMovies);

routerMovies.post('/', movieBodyValidator, createMovie);

routerMovies.delete('/:movieId', movieParamsValidator, removeMovieById);

module.exports = routerMovies;
