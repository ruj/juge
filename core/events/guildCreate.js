module.exports = (Juge, guild) => {
	const { GuildController } = require('../database/controllers');

	GuildController.add(guild)
		.then(() => Juge.log(`${guild.name} (${guild.id})`, 'guildCreate'))
		.catch((error) => Juge.log(error.message, 'guildCreate'));
};