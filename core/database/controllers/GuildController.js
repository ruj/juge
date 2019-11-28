const mongoose = require('mongoose');
const Guild = require('../models/Guild.js');

module.exports.add = (guild) => Guild.create({
	_id: guild.id,
	prefix: ''
});

module.exports.findOne = ({ id }) => Guild.findOne({ _id: id });

module.exports.remove = ({ id }) => Guild.deleteOne({ _id: id });

module.exports.update = ({ id }, entity, options = { upsert: true }) => Guild.updateOne({ _id: id }, entity, options);