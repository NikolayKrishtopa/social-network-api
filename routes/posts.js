const routerMovies = require('express').Router();
const {
  getMyPosts,
  createPost, getFriendsPosts,
  removePostById, likePostById, unlikePostById,
} = require('../controllers/post');

const postBodyValidator = require('../middlewares/requestValidators/postBodyValidator');
const postParamsValidator = require('../middlewares/requestValidators/postParamsValidator');

routerMovies.get('/', getMyPosts);

routerMovies.post('/', postBodyValidator, createPost);

routerMovies.delete('/:postId', postParamsValidator, removePostById);

routerMovies.put('/:postId/likes', postParamsValidator, likePostById);

routerMovies.delete('/:postId/likes', postParamsValidator, unlikePostById);

routerMovies.get('/friends', getFriendsPosts);

module.exports = routerMovies;
