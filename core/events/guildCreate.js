const { GuildController } = require('../database/controllers');

module.exports = async (Juge, guild) => {
	const guildExists = await GuildController.findOne(guild);
	if (guildExists) return;

	GuildController.add(guild)
		.then(() => Juge.log(`${guild.name} (${guild.id})`, { tags: ['guildCreate'], color: 'green' }))
		.catch((error) => Juge.log(error.message, { tags: ['guildCreate'], color: 'red' }));
};