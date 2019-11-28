const { GuildController } = require('../database/controllers');

module.exports = (Juge, guild) => {
	GuildController.remove(guild)
		.then(() => Juge.log(`${guild.name} (${guild.id})`, 'guildDelete'))
		.catch((error) => Juge.log(error.message, 'guildDelete'));
};