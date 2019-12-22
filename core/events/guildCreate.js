const { GuildController } = require('../database/controllers');

module.exports = async (client, guild) => {
	const guildExists = await GuildController.findOne(guild);
	if (guildExists) return;

	GuildController.add(guild)
		.then(() => client.log(`${guild.name} (${guild.id})`, { tags: ['guildCreate'], color: 'green' }))
		.catch((error) => client.log(error.message, { tags: ['guildCreate'], color: 'red' }));
};