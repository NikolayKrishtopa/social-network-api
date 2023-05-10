const routerMovies = require('express').Router();
const {
  getMyPosts,
  createPost,
  getFriendsPosts,
  getAllPosts,
  removePostById,
  likePostById,
  unlikePostById,
  getUsersPosts,
} = require('../controllers/post');

const postBodyValidator = require('../middlewares/requestValidators/postBodyValidator');
const postParamsValidator = require('../middlewares/requestValidators/postParamsValidator');

routerMovies.get('/', getAllPosts);

routerMovies.get('/my', getMyPosts);

routerMovies.post('/', postBodyValidator, createPost);

routerMovies.get('/friends', getFriendsPosts);

routerMovies.delete('/:postId', postParamsValidator, removePostById);

routerMovies.get('/:userId', getUsersPosts);

routerMovies.put('/:postId/like', postParamsValidator, likePostById);

routerMovies.delete('/:postId/like', postParamsValidator, unlikePostById);

module.exports = routerMovies;
