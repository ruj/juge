const { GuildController } = require('../database/controllers');

module.exports = async (Juge, guild) => {
	const guildExists = await GuildController.findOne(guild);
	if (guildExists) return;

	GuildController.add(guild)
		.then(() => Juge.log(`${guild.name} (${guild.id})`, 'guildCreate'))
		.catch((error) => Juge.log(error.message, 'guildCreate'));
};