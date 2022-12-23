const jwt = require("jsonwebtoken");
const TOKEN_ENCRYPT_KEY = require("../utils/key");
const User = require("../models/user");
const ERRORS_MESSAGES = require("../utils/ERRORS_MESSAGES");

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, TOKEN_ENCRYPT_KEY, {
        expiresIn: "7d",
      });
      res
        .cookie("jwt", token, {
          maxAge: 60 * 60 * 24 * 7000,
          httpOnly: true,
          // sameSite: "None",
          // secure: true,
        })
        .status(200)
        .send(user);
      Ы;
    })
    .catch(next);
};

module.exports.logout = async (req, res, next) => {
  try {
    return res
      .status(202)
      .clearCookie("jwt")
      .send({ message: ERRORS_MESSAGES.LOGOUT_SUCCESS });
  } catch (err) {
    return next(err);
  }
};
