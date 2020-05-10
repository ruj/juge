module.exports = {
	name: 'prefix',
	aliases: ['prefixes', 'setprefix', 'newprefix'],
	description: 'Management the server prefix',
	usage: '<new prefix|(delete|remove|reset)>',
	category: 'configuration',
	requirements: { botPermissions: ['EMBED_LINKS'], permissions: ['MANAGE_GUILD'] },
	cooldown: 60,
	execute(client, message) {
		if (message.parameters.length) {
			if (!client.config.prefixes.concat(`<@!${client.user.id}>`).includes(message.parameters[0]) && !['DELETE', 'REMOVE', 'RESET'].includes(message.parameters[0].toUpperCase())) {
				client.database.guilds.update(message.guild.id, { $set: { prefix: { value: message.parameters[0] } } })
					.then(() => {
						message.channel.send(new client.MessageEmbed()
							.setColor(client.utils.hexColor(message))
							.addField(':asterisk: New prefix', client.utils.sendCode(message.parameters[0], { code: 'fix' }))
						);
					})
					.catch((error) => {
						message.channel.send(new client.MessageEmbed()
							.setColor(client.utils.hexColor('ERROR'))
							.setDescription(`:x: : Oops, **${error.message}**`)
						);
					});
			} else if (['DELETE', 'REMOVE', 'RESET'].includes(message.parameters[0].toUpperCase())) {
				client.database.guilds.update(message.guild.id, { $set: { prefix: { value: '' } } })
					.then(() => {
						message.channel.send(new client.MessageEmbed()
							.setColor(client.utils.hexColor('SUCCESS'))
							.setDescription(':white_check_mark: : Server prefix successfully reset!')
						);
					})
					.catch((error) => {
						message.channel.send(new client.MessageEmbed()
							.setColor(client.utils.hexColor('ERROR'))
							.setDescription(`:x: : Oops, **${error.message}**`)
						);
					});
			} else {
				message.channel.send(new client.MessageEmbed()
					.setColor(client.utils.hexColor('WARNING'))
					.setDescription(':warning: : This is already a global prefix, try another one.')
				);
			}
		} else {
			client.database.guilds.findOne(message.guild.id)
				.then((guild) => {
					const prefixes = client.config.prefixes.concat(guild.prefix.value);
					const embed = new client.MessageEmbed()
						.setColor(client.utils.hexColor(message))
						.addField(':globe_with_meridians: Global prefixes', client.utils.sendCode(`${prefixes.slice(0, -1).join(' or ')}`, { code: 'fix' }))
						.addField(':house: Server prefix', client.utils.sendCode(guild.prefix.value ? guild.prefix.value : 'Not yet defined', { code: 'fix' }))

						if (new Date(guild.createdAt).getTime() !== new Date(guild.prefix.updatedAt).getTime()) embed.setFooter(`Updated ${client.utils.days(guild.prefix.updatedAt, { extended: false }) > 0 ? `${client.utils.days(guild.prefix.updatedAt)} ago` : 'today'}`);

					message.channel.send(embed);
				})
				.catch((error) => {
					message.channel.send(new client.MessageEmbed()
						.setColor(client.utils.hexColor('ERROR'))
						.setDescription(`:x: : Oops, **${error.message}**`)
					);
				});
		}
	}
};
