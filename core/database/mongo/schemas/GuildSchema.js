const { Schema, model } = require('mongoose');

const PrefixSchema = new Schema({
  value: String,
  global: {
    type: Boolean,
    default: true
  }
}, {
  _id: false,
  timestamps: {
    createdAt: false,
    updatedAt: true
  }
});

module.exports = model('Guild', new Schema({
	_id: String,
	prefix: PrefixSchema
}, {
  timestamps: {
    createdAt: true,
    updatedAt: false
  }
}));