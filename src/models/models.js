const mongoose = require('mongoose');

var schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  gender: String,
  phoneNumber: String
});

const userDb = mongoose.model('users', schema);

module.exports = userDb;
