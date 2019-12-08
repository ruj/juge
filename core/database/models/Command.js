const { Schema, model } = require('mongoose');

module.exports = model('Command', new Schema({
	_id: String,
	name: String,
	category: String,
	count: Number	
}, {
	timestamps: {
		createdAt: true,
		updatedAt: false
	}
}));