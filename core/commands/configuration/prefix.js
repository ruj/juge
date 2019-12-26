const { GuildController } = require('../../database/controllers');

module.exports = {
	name: 'prefix',
	aliases: ['prefixes', 'setprefix', 'newprefix'],
	permissions: ['EMBED_LINKS'],
	permissionLevel: 6,
	description: 'Management the server prefix',
	usage: '<new prefix|(delete|remove|reset)>',
	category: 'configuration',
	guildOnly: false,
	params: false,
	cooldown: 60,
	enabled: true,
	execute(client, message, params) {
		if (params.length > 0) {
			if (!client.config.prefixes.concat(`<@${client.user.id}> `).includes(params[0]) && ![ 'DELETE', 'REMOVE', 'RESET' ].includes(params[0].toUpperCase())) {
				GuildController.update(message.guild, { $set: { prefix: params[0] } })
					.then(() => {
						message.channel.send(new client.RichEmbed()
							.setColor(client.util.hexColor(message))
							.addField(':asterisk: New prefix', client.util.sendCode(params[0], { code: 'fix' }))
						);
					})
					.catch((error) => {
						message.channel.send(new client.RichEmbed()
							.setColor(client.util.hexColor('ERROR'))
							.setDescription(`:x: : Oops, **${error.message}**`)
						);
					});
			} else if ([ 'DELETE', 'REMOVE', 'RESET' ].includes(params[0].toUpperCase())) {
				GuildController.update(message.guild, { $set: { prefix: '' } })
					.then(() => {
						message.channel.send(new client.RichEmbed()
							.setColor(client.util.hexColor('SUCCESS'))
							.setDescription(':white_check_mark: : Server prefix successfully reset!')
						);
					})
					.catch((error) => {
						message.channel.send(new client.RichEmbed()
							.setColor(client.util.hexColor('ERROR'))
							.setDescription(`:x: : Oops, **${error.message}**`)
						);
					});
			} else {
				message.channel.send(new client.RichEmbed()
					.setColor(client.util.hexColor('WARNING'))
					.setDescription(':warning: : This is already a global prefix, try another one.')
				);
			}
		} else {
			GuildController.findOne(message.guild)
				.then((guild) => {
					const prefixes = client.config.prefixes.concat(guild.prefix);
					const embed = new client.RichEmbed()
						.setColor(client.util.hexColor(message))
						.addField(':globe_with_meridians: Global prefixes', client.util.sendCode(`${prefixes.slice(0, -1).join(' or ')}`, { code: 'fix' }))
						.addField(':house: Server prefix', client.util.sendCode(guild.prefix ? guild.prefix : 'Not yet defined', { code: 'fix' }))
						new Date(guild.createdAt).getTime() !== new Date(guild.updatedAt).getTime() ? embed.setFooter(`Updated ${client.util.checkDays(guild.updatedAt) !== '0 days' ? `${client.util.checkDays(guild.updatedAt)} ago` : 'today'}`) : undefined;
					message.channel.send(embed);
				})
				.catch((error) => {
					message.channel.send(new client.RichEmbed()
						.setColor(client.util.hexColor('ERROR'))
						.setDescription(`:x: : Oops, **${error.message}**`)
					);
				});
		}
	}
};
