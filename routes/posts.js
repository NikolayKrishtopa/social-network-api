const routerMovies = require('express').Router();
const {
  getMyPosts,
  createPost, getFriendsPosts, getAllPosts,
  removePostById, likePostById, unlikePostById, getUsersPosts,
} = require('../controllers/post');

const postBodyValidator = require('../middlewares/requestValidators/postBodyValidator');
const postParamsValidator = require('../middlewares/requestValidators/postParamsValidator');

routerMovies.get('/', getAllPosts);

routerMovies.get('/my', getMyPosts);

routerMovies.post('/', postBodyValidator, createPost);

routerMovies.delete('/:postId', postParamsValidator, removePostById);

routerMovies.get('/:userId', getUsersPosts);

routerMovies.put('/:postId/likes', postParamsValidator, likePostById);

routerMovies.delete('/:postId/likes', postParamsValidator, unlikePostById);

routerMovies.get('/friends', getFriendsPosts);

module.exports = routerMovies;
