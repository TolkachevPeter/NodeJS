import { Joi, celebrate } from 'celebrate';
import { emailJoi } from './email-model';
import { linkJoi } from './link-model';
import { nameJoi } from './name-model';
import { passwordJoi } from './password-model';
import { objectJoi } from './object-id-model';

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

const objectIdModel = celebrate({
  params: Joi.object().keys({
    id: objectJoi,
  }),
});

export {
  cardJoiModel,
  infoJoiModel,
  avatarJoiModel,
  loginJoiModel,
  createUserJoiModel,
  passwordModel,
  objectIdModel,
};
