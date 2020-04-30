module.exports = (client, guild) => {
	client.database.guilds.remove(guild.id)
		.then(() => client.log(`${guild.name} (${guild.id})`, { tags: ['guildDelete'], color: 'green' }))
		.catch((error) => client.log(error.message, { tags: ['guildDelete'], color: 'red' }));
};