const { Joi } = require('celebrate');

module.exports.passwordJoi = Joi.string().required().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'));
