const { Joi } = require('celebrate');

module.exports.emailJoiModel = Joi.string().required().email();
