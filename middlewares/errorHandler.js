const ERRORS_MESSAGES = require('../utils/ERRORS_MESSAGES');

module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode)
    .send(
      statusCode !== 500 ? { message }
        : { message: ERRORS_MESSAGES.DEFAULT_ERROR },
    );
  next();
};
