import { Joi } from 'celebrate';

export const objectJoi = Joi.string().hex().length(24);
