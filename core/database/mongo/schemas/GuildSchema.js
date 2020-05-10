const { Schema, model } = require('mongoose');

const PrefixSchema = new Schema({
  value: {
    type: String,
    required: true
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