const { Joi } = require('celebrate');

module.exports.objectJoi = Joi.string().hex().length(24);
