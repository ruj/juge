const mongoose = require('mongoose');
const Guild = require('../models/Guild.js');

module.exports.add = (guild) => {
	return Guild.create({
		_id: guild.id,
		prefix: ''
	})
	.then((data) => data)
	.catch((error) => error);
};

module.exports.remove = (guild) => {
	return Guild.deleteOne({ _id: guild.id })
		.then((data) => data)
		.catch((error) => error);
};