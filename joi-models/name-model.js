const { Joi } = require('celebrate');

module.exports.nameJoiModel = Joi.string()
  .min(3)
  .max(30)
  .required();
