const { Joi } = require('celebrate');

module.exports.linkJoi = Joi.string().uri();
