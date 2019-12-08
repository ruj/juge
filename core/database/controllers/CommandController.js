const MongoController = require('../MongoController.js');
const Command = require('../models/Command.js');
const { hex } = require('../../util/Util.js');

module.exports = {
	add(command) {
		return MongoController.add(Command, {
			_id: hex(command.name),
			name: command.name,
			category: command.category,
			count: 1
		});
	},

	findOne(name, projection) {
		return MongoController.findOne(Command, hex(name), projection);
	},

	findAll(projection) {
		return MongoController.findAll(Command, projection);
	},

	get(name, projection) {
		return MongoController.get(Command, { name }, projection);
	},

	remove(name) {
		return MongoController.remove(Command, hex(name));
	},

	update(name, entity) {
		return MongoController.update(Command, hex(name), entity);
	}
};