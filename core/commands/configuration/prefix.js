module.exports = {
	name: 'prefix',
	aliases: ['prefixes', 'setprefix', 'newprefix'],
	description: 'Management the server prefix',
	usage: '<new prefix|(delete|remove|reset)|global>',
	category: 'configuration',
	requirements: { botPermissions: ['EMBED_LINKS'], permissions: ['MANAGE_GUILD'] },
	cooldown: 45,
	async execute(client, message) {
		if (message.parameters.length) {
			try {
				const guild = await client.database.guilds.findOne(message.guild.id);

				if (!client.config.prefixes.concat([`<@${client.user.id}>`, `<@!${client.user.id}>`]).includes(message.parameters[0]) &&
					  !['DELETE', 'REMOVE', 'RESET'].includes(message.parameters[0].toUpperCase()) &&
					  message.parameters[0].toUpperCase() !== 'GLOBAL') {
					guild.prefix.value = message.parameters[0];
					client.database.guilds.update(message.guild.id, { $set: { prefix: guild.prefix } })
						.then(() => message.channel.send(new client.MessageEmbed()
								.setColor(client.utils.hexColor(message))
								.addField(':asterisk: New prefix', client.utils.sendCode(guild.prefix.value, { code: 'fix' }))
						));
				} else if (['DELETE', 'REMOVE', 'RESET'].includes(message.parameters[0].toUpperCase())) {
					if (!guild.prefix.global) throw new Error('It is not possible to remove the custom prefix while global prefixes are disabled');

					guild.prefix.value = '';
					client.database.guilds.update(message.guild.id, { $set: { prefix: guild.prefix } })
						.then(() => message.channel.send(new client.MessageEmbed()
								.setColor(client.utils.hexColor('SUCCESS'))
								.setDescription(':white_check_mark: : Server prefix successfully reset!')
						));
				} else if (message.parameters[0].toUpperCase() === 'GLOBAL') {
					if (guild.prefix.global && !guild.prefix.value) throw new Error('It is not possible to disable global prefixes without having defined a prefix for the server before');

					guild.prefix.global = !guild.prefix.global ? true : false;
					client.database.guilds.update(message.guild.id, { $set: { prefix: guild.prefix } })
						.then(() => message.channel.send(new client.MessageEmbed()
							.setColor(client.utils.hexColor(message))
							.setDescription(`:white_check_mark: : I **${guild.prefix.global ? 'activated' : 'disabled'}** global prefixes for this server.`)
						));
				} else {
					message.channel.send(new client.MessageEmbed()
						.setColor(client.utils.hexColor('WARNING'))
						.setDescription(':warning: : This is already a global prefix, try another one.')
					);
				}
			} catch (error) {
				message.channel.send(new client.MessageEmbed()
					.setColor(client.utils.hexColor('ERROR'))
					.setDescription(`:x: : Oops, **${error.message}**`)
				);
			}
		} else {
			client.database.guilds.findOne(message.guild.id)
				.then((guild) => {
					const embed = new client.MessageEmbed()
						.setColor(client.utils.hexColor(message))
						.addFields([
							(client.utils.insertIf(guild.prefix.global, {
								name: ':globe_with_meridians: Global prefixes',
								value: client.utils.sendCode(client.config.prefixes.join(' or '), { code: 'fix' })
							})), {
								name: ':house: Server prefix',
								value: client.utils.sendCode(guild.prefix.value ? guild.prefix.value : 'Not yet defined', { code: 'fix' })
							}
						].filter(Boolean));

						if (new Date(guild.createdAt).getTime() !== new Date(guild.prefix.updatedAt).getTime()) embed.setFooter(`Updated ${client.utils.days(guild.prefix.updatedAt, { extended: false }) > 0 ? `${client.utils.days(guild.prefix.updatedAt)} ago` : 'today'}`);

					message.channel.send(embed);
				})
				.catch((error) => message.channel.send(new client.MessageEmbed()
						.setColor(client.utils.hexColor('ERROR'))
						.setDescription(`:x: : Oops, **${error.message}**`)
				));
		}
	}
};
