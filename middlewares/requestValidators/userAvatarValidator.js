const { celebrate, Joi } = require('celebrate');
const validateURL = require('../../utils/validateUrl');

// const URL_REGEXP = require('../../utils/urlRegexp');

module.exports = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().custom(validateURL),
  }),
});
