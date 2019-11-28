module.exports = (Juge, guild) => {
	const { GuildController } = require('../database/controllers');

	GuildController.remove(guild)
		.then(() => Juge.log(`${guild.name} (${guild.id})`, 'guildDelete'))
		.catch((error) => Juge.log(error.message, 'guildDelete'));
};