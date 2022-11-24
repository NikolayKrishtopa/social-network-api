const router = require('express').Router();
const userBodyValidator = require('../middlewares/requestValidators/userBodyValidator');
const routerMovies = require('./movies');
const routerUsers = require('./users');
const { login, logout } = require('../controllers/login');
const { createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const NotFoundError = require('../utils/errors/NotFoundError');

router.post('/signin', userBodyValidator, login);
router.delete('/signout', logout);
router.post('/signup', userBodyValidator, createUser);

router.use(auth);
router.use('/movies', routerMovies);
router.use('/users', routerUsers);
router.use('*', () => {
  throw new NotFoundError('По вашему запросу ничего не найдено');
});

module.exports = router;
