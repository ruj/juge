module.exports = async (client, guild) => {
	const guildExists = await client.database.guilds.findOne(guild.id);
	if (guildExists) return;

	client.database.guilds.add(guild)
		.then(() => client.log(`${guild.name} (${guild.id})`, { tags: ['guildCreate'], color: 'green' }))
		.catch((error) => client.log(error.message, { tags: ['guildCreate'], color: 'red' }));
};