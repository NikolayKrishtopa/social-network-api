const { celebrate, Joi } = require('celebrate');
const validateURL = require('../../utils/validateUrl');

// const URL_REGEXP = require('../../utils/urlRegexp');

module.exports = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().custom(validateURL),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
