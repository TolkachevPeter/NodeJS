const { Joi } = require('celebrate');
const { emailJoiModel } = require('./email-model');
const { linkJoiModel } = require('./link-model');
const { nameJoiModel } = require('./name-model');
const { passwordJoiModel } = require('./password-model');

const createUserJoiModel = Joi.object.keys({
  name: nameJoiModel,
  about: nameJoiModel,
  avatar: linkJoiModel,
  email: emailJoiModel,
  password: passwordJoiModel,
});

const loginJoiModel = Joi.object.keys({
  email: emailJoiModel,
  password: passwordJoiModel,
});

const avatarJoiModel = Joi.object.keys({
  avatar: linkJoiModel,
});

const cardJoiModel = Joi.object.keys({
  name: nameJoiModel,
  link: linkJoiModel,
});

const infoJoiModel = Joi.object.keys({
  name: nameJoiModel,
  about: nameJoiModel,
});

module.exports = {
  createUserJoiModel,
  loginJoiModel,
  avatarJoiModel,
  cardJoiModel,
  infoJoiModel,
};
