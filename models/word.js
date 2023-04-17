const mongoose = require('mongoose');
const validator = require('validator/');

const wordSchema = new mongoose.Schema({
  word: {
    required: true,
    type: String,
  },
  meaning: {
    required: false,
    type: String,
  },
  example: {
    required: false,
    type: String,
  },
  image: {
    required: false,
    type: String,
    validator: (link) => validator.isURL(link),
  },
  owner: {
    type: mongoose.ObjectId,
    ref: 'user',
    required: true,
  },
}, { versionKey: false });

module.exports = mongoose.model('word', wordSchema);
