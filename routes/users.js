const routerUsers = require('express').Router();
const {
  updateProfile, getMyProfile, getUsers, searchUser, getUserProfile,
} = require('../controllers/users');
const checkEmailOccupied = require('../middlewares/checkEmailOccupied');

const userDataValidator = require('../middlewares/requestValidators/userDataValidator');

routerUsers.get('/', getUsers);

routerUsers.get('/:search', searchUser);

routerUsers.get('/:id', getUserProfile);

routerUsers.get('/me', getMyProfile);

routerUsers.patch('/me', userDataValidator, checkEmailOccupied, updateProfile);

module.exports = routerUsers;
