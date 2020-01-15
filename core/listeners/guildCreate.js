const { GuildRepository } = require('../database/repositories');

module.exports = async (client, guild) => {
	const guildExists = await GuildRepository.findOne(guild);
	if (guildExists) return;

	GuildRepository.add(guild)
		.then(() => client.log(`${guild.name} (${guild.id})`, { tags: ['guildCreate'], color: 'green' }))
		.catch((error) => client.log(error.message, { tags: ['guildCreate'], color: 'red' }));
};