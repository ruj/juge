const mongoose = require('mongoose');
const Guild = require('../models/Guild.js');

module.exports.add = (guild) => {
	Guild.create({
		_id: guild.id,
		prefix: ''
	})
	.then((created) => created)
	.catch((error) => error);
};

module.exports.remove = (guild) => {
	Guild.findOneAndRemove({ _id: guild.id })
		.then((removed) => removed)
		.catch((error) => error);
};