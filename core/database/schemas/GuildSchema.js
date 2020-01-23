const { Schema, model } = require('mongoose');

module.exports = model('Guild', new Schema({
	_id: String,
	prefix: String
}, {
	timestamps: true
}));