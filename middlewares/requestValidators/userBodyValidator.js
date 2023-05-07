const { celebrate, Joi } = require('celebrate');
const validateURL = require('../../utils/validateUrl');

module.exports = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    city: Joi.string().required(),
    college: Joi.string().required(),
    avatar: Joi.string().custom(validateURL),
  }),
});
