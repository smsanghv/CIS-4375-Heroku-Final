const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create schema for new user info
const userSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
  type: String,
  required: true
  },
  zip: {
  type: String,
  required: true
  },
  password: {
    type: String,
    required: true
  },
  privilege: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: false
  },
  created: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = User = mongoose.model('user', userSchema, 'userAccounts');