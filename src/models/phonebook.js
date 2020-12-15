const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const phoneBookSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  phone_numbers: [{
    type: Schema.Types.ObjectId,
    ref: 'PhoneNumber',
    required: true
  }],
  email: {
    type: String,
    required: true
  },
  mailing_address: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('PhoneBook', phoneBookSchema);