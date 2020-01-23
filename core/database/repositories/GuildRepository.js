const MongoRepository = require('../MongoRepository.js');
const Guild = require('../schemas/GuildSchema.js');

module.exports = {
	add(guild) {
		return MongoRepository.add(Guild, {
			_id: guild.id,
			prefix: ''
		});
	},

	findOne({ id }, projection) {
		return MongoRepository.findOne(Guild, id, projection);
	},

	findAll(projection) {
		return MongoRepository.findAll(Guild, projection);
	},

	get({ id }, projection) {
		return MongoRepository.get(Guild, id, projection);
	},

	remove({ id }) {
		return MongoRepository.remove(Guild, id);
	},

	update({ id }, entity) {
		return MongoRepository.update(Guild, id, entity);
	}
};