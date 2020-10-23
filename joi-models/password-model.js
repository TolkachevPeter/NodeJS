const { Joi } = require('celebrate');

// eslint-disable-next-line no-useless-escape
module.exports.passwordJoi = Joi.string().required().pattern(new RegExp('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'));
