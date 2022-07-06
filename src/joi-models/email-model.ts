import { Joi } from 'celebrate';

export const emailJoi = Joi.string().required().email();
