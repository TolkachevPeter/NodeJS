const mongoose = require('mongoose');
const validate = require('mongoose-validator');

const linkValidor = [
  validate({
    validator: (value) => validate.isURL(value, { protocols: ['http', 'https', 'ftp'], require_tld: true, require_protocol: true }),
    message: 'Must be a Valid URL',
  }),
];

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: true,
    validate: linkValidor,
  },
});

module.exports = mongoose.model('user', userSchema);
