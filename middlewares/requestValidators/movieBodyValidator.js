const { celebrate, Joi } = require('celebrate');
const validateURL = require('../../utils/validateUrl');
// const URL_REGEXP = require('../../utils/urlRegexp');

module.exports = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().custom(validateURL),
  }),
});
