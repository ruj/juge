const { GuildController } = require('../database/controllers');

module.exports = (Juge, guild) => {
	GuildController.add(guild)
		.then(() => Juge.log(`${guild.name} (${guild.id})`, 'guildCreate'))
		.catch((error) => Juge.log(error.message, 'guildCreate'));
};