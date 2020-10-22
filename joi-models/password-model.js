/* eslint-disable */
const { Joi } = require('celebrate');

module.exports.passwordJoi = Joi.string().required().pattern(new RegExp('^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$'));
