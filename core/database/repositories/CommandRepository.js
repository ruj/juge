const MongoRepository = require('../MongoRepository.js');
const Command = require('../models/Command.js');
const { md5 } = require('../../util/CryptoUtil.js');

module.exports = {
	add(command) {
		return MongoRepository.add(Command, {
			_id: md5(command.name),
			name: command.name,
			category: command.category,
			count: 1
		});
	},

	findOne(name, projection) {
		return MongoRepository.findOne(Command, md5(name), projection);
	},

	findAll(projection) {
		return MongoRepository.findAll(Command, projection);
	},

	get(name, projection) {
		return MongoRepository.get(Command, { name }, projection);
	},

	remove(name) {
		return MongoRepository.remove(Command, md5(name));
	},

	update(name, entity) {
		return MongoRepository.update(Command, md5(name), entity);
	}
};