const router = require('express').Router();
const userBodyValidator = require('../middlewares/requestValidators/userBodyValidator');
const routerPosts = require('./posts');
const routerUsers = require('./users');
const { login, logout } = require('../controllers/login');
const { createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../utils/errors/NotFoundError');
const ERRORS_MESSAGES = require('../utils/ERRORS_MESSAGES');
const userBodyValidatorForLogin = require('../middlewares/requestValidators/userBodyValidatorForLogin');

router.post('/signin', userBodyValidatorForLogin, login);
router.delete('/signout', logout);
router.post('/signup', userBodyValidator, createUser);

router.use(auth);
router.use('/posts', routerPosts);
router.use('/users', routerUsers);
router.use('*', () => {
  throw new NotFoundError(ERRORS_MESSAGES.NOT_FOUND);
});

module.exports = router;
