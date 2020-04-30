const { Schema, model } = require('mongoose');

const BlacklistedSchema = new Schema({
  reason: {
    type: String,
    required: true
  },
  blacklister: {
    type: String,
    required: true
  }
});

module.exports = model('User', new Schema({
  _id: String,
  blacklisted: BlacklistedSchema
}));