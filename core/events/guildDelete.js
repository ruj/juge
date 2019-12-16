const { GuildController } = require('../database/controllers');

module.exports = (Juge, guild) => {
	GuildController.remove(guild)
		.then(() => Juge.log(`${guild.name} (${guild.id})`, { tags: ['guildDelete'], color: 'green' }))
		.catch((error) => Juge.log(error.message, { tags: ['guildDelete'], color: 'red' }));
};