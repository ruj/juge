const { GuildRepository } = require('../database/repositories');

module.exports = (client, guild) => {
	GuildRepository.remove(guild)
		.then(() => client.log(`${guild.name} (${guild.id})`, { tags: ['guildDelete'], color: 'green' }))
		.catch((error) => client.log(error.message, { tags: ['guildDelete'], color: 'red' }));
};