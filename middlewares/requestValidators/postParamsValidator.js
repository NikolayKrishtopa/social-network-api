const { celebrate, Joi } = require('celebrate');

module.exports = celebrate({
  params: Joi.object().keys({
    postId: Joi.string().length(24).hex(),
  }),
});
