const { Joi } = require('celebrate');

module.exports.emailJoi = Joi.string().required().email();
