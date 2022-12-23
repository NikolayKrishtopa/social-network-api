const jwt = require("jsonwebtoken");
const TOKEN_ENCRYPT_KEY = require("../utils/key");
const UnauthorizedError = require("../utils/errors/UnauthorizedError");

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    throw new UnauthorizedError(`нет куки ${req.cookies.jwt}`);
  }
  let payload;
  try {
    payload = jwt.verify(token, TOKEN_ENCRYPT_KEY);
  } catch (err) {
    return next(new UnauthorizedError(`куки не работают ${TOKEN_ENCRYPT_KEY}`));
  }
  req.user = { _id: payload._id };
  return next();
};
