const jwt = require('jsonwebtoken');
const TOKEN_ENCRYPT_KEY = require('../utils/key');
const User = require('../models/user');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, TOKEN_ENCRYPT_KEY, { expiresIn: '7d' });
      res.cookie('jwt', token, {
        maxAge: 60 * 60 * 24 * 7000,
        httpOnly: true,
        sameSite: 'None',
        // secure: true,
      }).status(200).send(TOKEN_ENCRYPT_KEY);
    })
    .catch(next);
};

module.exports.logout = async (req, res, next) => {
  try { return res.status(202).clearCookie('jwt').send({ message: 'Пользователь успешно вышел из аккаунта' }); } catch (err) {
    return next(err);
  }
};
