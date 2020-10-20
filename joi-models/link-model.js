const { Joi } = require('celebrate');

module.exports.urlJoiModel = Joi.string().uri();
