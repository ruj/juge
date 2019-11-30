const MongoController = require('../MongoController.js');
const Guild = require('../models/Guild.js');

module.exports = {
	add(guild) {
		return MongoController.add(Guild, {
			_id: guild.id,
			prefix: ''
		});
	},

	findOne({ id }, projection) {
		return MongoController.findOne(Guild, id, projection);
	},

	findAll(projection) {
		return MongoController.findAll(Guild, projection);
	},

	get({ id }, projection) {
		return MongoController.get(Guild, id, projection);
	},

	remove({ id }) {
		return MongoController.remove(Guild, id);
	},

	update({ id }, entity) {
		return MongoController.update(Guild, id, entity);
	}
};