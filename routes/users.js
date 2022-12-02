const routerUsers = require('express').Router();
const {
  updateProfile, getUserProfile,
} = require('../controllers/users');
const checkEmailOccupied = require('../middlewares/checkEmailOccupied');

const userDataValidator = require('../middlewares/requestValidators/userDataValidator');

routerUsers.get('/me', getUserProfile);

routerUsers.patch('/me', userDataValidator, checkEmailOccupied, updateProfile);

module.exports = routerUsers;
