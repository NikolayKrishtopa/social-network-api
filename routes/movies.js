const routerMovies = require('express').Router();
const {
  getAllMovies,
  createMovie,
  removeMovieById,
  likeMovieById,
  unlikeMovieById,
} = require('../controllers/movies');

const movieBodyValidator = require('../middlewares/requestValidators/movieBodyValidator');
const movieParamsValidator = require('../middlewares/requestValidators/movieParamsValidator');

routerMovies.get('/', getAllMovies);

routerMovies.post('/', movieBodyValidator, createMovie);

routerMovies.delete('/:movieId', movieParamsValidator, removeMovieById);

routerMovies.put('/:movieId/likes', movieParamsValidator, likeMovieById);

routerMovies.delete('/:movieId/likes', movieParamsValidator, unlikeMovieById);

module.exports = routerMovies;
