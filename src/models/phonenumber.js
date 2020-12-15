const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const phoneNumberSchema = new Schema({
  tag: {
    type: String,
    enum: ['mobile', 'work', 'home', 'other'],
    required: true
  },
  number: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('PhoneNumber', phoneNumberSchema);