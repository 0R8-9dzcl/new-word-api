const { celebrate, Joi } = require('celebrate'); // импорт валидатора
const validator = require('validator/'); // импорт валидатора
const errMess = require('../utils/errMess');

const isURL = (value, helpers) => (validator.isURL(value)
  ? value : helpers.message(errMess.notValid.url));

module.exports.postWordValidator = celebrate({
  body: Joi.object().keys({
    word: Joi.string().required(),
    meaning: Joi.string(),
    example: Joi.string(),
    image: Joi.string().custom(isURL),
  }),
});
module.exports.patchWordValidator = celebrate({
  body: Joi.object().keys({
    word: Joi.string().required(),
    meaning: Joi.string(),
    example: Joi.string(),
    image: Joi.string().custom(isURL),
  }),
});
module.exports.deleteWordValidator = celebrate({
  params: Joi.object().keys({
    wordId: Joi.string().length(24).hex(),
  }),
});
module.exports.createUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
module.exports.loginUserValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});
module.exports.patchUserValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});
