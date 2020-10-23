const { Joi } = require('celebrate');

module.exports.nameJoi = Joi.string()
  .min(2)
  .max(30)
  .required();
