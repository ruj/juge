const { GuildController } = require('../database/controllers');

module.exports = (client, guild) => {
	GuildController.remove(guild)
		.then(() => client.log(`${guild.name} (${guild.id})`, { tags: ['guildDelete'], color: 'green' }))
		.catch((error) => client.log(error.message, { tags: ['guildDelete'], color: 'red' }));
};