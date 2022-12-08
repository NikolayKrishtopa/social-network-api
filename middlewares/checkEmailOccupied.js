const User = require('../models/user');
const UserExistError = require('../utils/errors/ExistError');

module.exports = (req, res, next) => {
  const { email } = req.body;
  User.findOne({ email }).then((user) => {
    if (!user) {
      next();
    } else if (user._id.toString() !== req.user._id.toString()) {
      next(new UserExistError('Пользователь с таким email уже существует'));
    } else next();
  });
};
