const { celebrate, Joi } = require('celebrate');
const validateURL = require('../../utils/validateUrl');

module.exports = celebrate({
  body: Joi.object().keys({
    text: Joi.string().required(),
    image: Joi.custom(validateURL),
  }),
});
