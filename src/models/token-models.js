const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
});

const tokenDb = mongoose.model('token', schema);

module.exports = tokenDb;
