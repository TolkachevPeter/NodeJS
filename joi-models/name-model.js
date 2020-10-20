const { Joi } = require('celebrate');

module.exports.nameJoi = Joi.string()
  .min(3)
  .max(30)
  .required();
