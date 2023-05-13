const routerUsers = require('express').Router();
const {
  updateProfile,
  getMyProfile,
  getUsers,
  searchUser,
  getUserProfile,
  addToFriendsById,
  removeFromFriendsById,
  getFriends,
} = require('../controllers/users');
const checkEmailOccupied = require('../middlewares/checkEmailOccupied');

const userBodyValidator = require('../middlewares/requestValidators/userBodyValidator');

routerUsers.get('/', getUsers);

routerUsers.get('/friends', getFriends);

routerUsers.get('/me', getMyProfile);

routerUsers.get('/search/:search', searchUser);

routerUsers.get('/:userId', getUserProfile);

routerUsers.patch('/me', userBodyValidator, checkEmailOccupied, updateProfile);

routerUsers.put('/:userId/connect', addToFriendsById);

routerUsers.delete('/:userId/connect', removeFromFriendsById);

module.exports = routerUsers;
