const MongoController = require('../MongoController.js');
const Command = require('../models/Command.js');
const { md5 } = require('../../util/CryptoUtil.js');

module.exports = {
	add(command) {
		return MongoController.add(Command, {
			_id: md5(command.name),
			name: command.name,
			category: command.category,
			count: 1
		});
	},

	findOne(name, projection) {
		return MongoController.findOne(Command, md5(name), projection);
	},

	findAll(projection) {
		return MongoController.findAll(Command, projection);
	},

	get(name, projection) {
		return MongoController.get(Command, { name }, projection);
	},

	remove(name) {
		return MongoController.remove(Command, md5(name));
	},

	update(name, entity) {
		return MongoController.update(Command, md5(name), entity);
	}
};