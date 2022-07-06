import { Joi } from 'celebrate';

export const nameJoi = Joi.string()
  .min(2)
  .max(30)
  .required();
