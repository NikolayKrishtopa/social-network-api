const routerUsers = require('express').Router();
const {
  updateProfile, getUserProfile,
} = require('../controllers/users');

const userDataValidator = require('../middlewares/requestValidators/userDataValidator');

routerUsers.get('/me', getUserProfile);

routerUsers.patch('/me', userDataValidator, updateProfile);

module.exports = routerUsers;
