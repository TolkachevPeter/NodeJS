import { Joi } from 'celebrate';

// eslint-disable-next-line no-useless-escape
export const passwordJoi = Joi.string().required().pattern(new RegExp('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'));
