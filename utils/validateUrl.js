const validator = require('validator');
const ERRORS_MESSAGES = require('./ERRORS_MESSAGES');

const validateURL = (value) => {
  if (value === null) return value;
  if (!validator.isURL(value, { require_protocol: true })) {
    throw new Error(ERRORS_MESSAGES.INCORRECT_URL);
  }
  return value;
};

module.exports = validateURL;
