const routerMovies = require('express').Router();
const {
  getUserPosts,
  createPost,
  removePostById, likePostById, unlikePostById,
} = require('../controllers/post');

const postBodyValidator = require('../middlewares/requestValidators/postBodyValidator');
const postParamsValidator = require('../middlewares/requestValidators/postParamsValidator');

routerMovies.get('/', getUserPosts);

routerMovies.post('/', postBodyValidator, createPost);

routerMovies.delete('/:postId', postParamsValidator, removePostById);

routerMovies.put('/:postId/likes', postParamsValidator, likePostById);

routerMovies.delete('/:postId/likes', postParamsValidator, unlikePostById);

module.exports = routerMovies;
