const { Joi, celebrate } = require('celebrate');
const { emailJoi } = require('./email-model');
const { linkJoi } = require('./link-model');
const { nameJoi } = require('./name-model');
const { passwordJoi } = require('./password-model');

const createUserJoiModel = celebrate({
  body: Joi.object().keys({
    name: nameJoi,
    about: nameJoi,
    avatar: linkJoi,
    email: emailJoi,
    password: passwordJoi,
  }),
});

const loginJoiModel = celebrate({
  body: Joi.object().keys({
    email: emailJoi,
    password: passwordJoi,
  }),
});

const avatarJoiModel = celebrate({
  body: Joi.object().keys({
    avatar: linkJoi,
  }),
});

const cardJoiModel = celebrate({
  body: Joi.object().keys({
    name: nameJoi,
    link: linkJoi,
  }),
});

const infoJoiModel = celebrate({
  body: Joi.object().keys({
    name: nameJoi,
    about: nameJoi,
  }),
});

const passwordModel = celebrate({
  body: Joi.object().keys({
    password: passwordJoi,
  }),
});

module.exports = {
  cardJoiModel,
  infoJoiModel,
  avatarJoiModel,
  loginJoiModel,
  createUserJoiModel,
  passwordModel,
};
