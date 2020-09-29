const mongoose = require('mongoose');
const validate = require('mongoose-validator');

const linkValidor = [
  validate({
    validator: (value) => validate.isURL(value, { protocols: ['http', 'https', 'ftp'], require_tld: true, require_protocol: true }),
    message: 'Must be a Valid URL',
  }),
];

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: linkValidor,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'owner',

  },
  likes: {
    type: mongoose.Schema.Types.ObjectId,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('card', cardSchema);
