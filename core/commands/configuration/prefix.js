const { GuildController } = require('../../database/controllers');

module.exports = {
	name: 'prefix',
	aliases: ['prefixes', 'setprefix', 'newprefix'],
	permissions: ['EMBED_LINKS'],
	permissionLevel: 0,
	description: 'Add/Update/Remove server prefix',
	usage: '<new prefix|(delete|remove|reset)>',
	category: 'configuration',
	guildOnly: false,
	params: false,
	cooldown: 60,
	enabled: true,
	execute(Juge, message, params) {
		if (message.member.permissions.has('MANAGE_GUILD')) {
			if (params.length > 0) {
				if (!Juge.config.prefixes.concat(`<@${Juge.user.id}> `).includes(params[0]) && ![ 'DELETE', 'REMOVE', 'RESET' ].includes(params[0].toUpperCase())) {
					GuildController.update(message.guild, { $set: { prefix: params[0] } })
						.then(() => {
							const embed = new Juge.RichEmbed()
								.setColor(Juge.util.hexColor.embed(message))
								.addField(':asterisk: New prefix', Juge.util.sendCode(params[0], { code: 'fix' }))
							message.channel.send(embed);
						})
						.catch((error) => {
							const embed = new Juge.RichEmbed()
								.setColor(Juge.util.hexColor.error)
								.setDescription(`:x: : ${error.message}`)
							message.channel.send(embed);
						});
				} else if ([ 'DELETE', 'REMOVE', 'RESET' ].includes(params[0].toUpperCase())) {
					GuildController.update(message.guild, { $set: { prefix: '' } })
						.then(() => {
							const embed = new Juge.RichEmbed()
								.setColor(Juge.util.hexColor.success)
								.setDescription(':white_check_mark: : Server prefix successfully reset!')
							message.channel.send(embed);
						})
						.catch((error) => {
							const embed = new Juge.RichEmbed()
								.setColor(Juge.util.hexColor.error)
								.setDescription(`:x: : ${error.message}`)
							message.channel.send(embed);
						});
				} else {
					const embed = new Juge.RichEmbed()
						.setColor(Juge.util.hexColor.warning)
						.setDescription(':warning: : This is already a global prefix, try another one.')
					message.channel.send(embed);
				}
			} else {
				GuildController.findOne(message.guild)
					.then((guild) => {
						const prefixes = Juge.config.prefixes.concat(guild.prefix);
						const embed = new Juge.RichEmbed()
							.setColor(Juge.util.hexColor.embed(message))
							.addField(':globe_with_meridians: Global prefixes', Juge.util.sendCode(`${prefixes.slice(0, -1).join(' or ')}`, { code: 'fix' }))
							.addField(':house: Server prefix', Juge.util.sendCode(guild.prefix ? guild.prefix : 'Not yet defined', { code: 'fix' }))
						message.channel.send(embed);
					})
					.catch((error) => {
						const embed = new Juge.RichEmbed()
							.setColor(Juge.util.hexColor.error)
							.setDescription(`:x: : ${error.message}`)
						message.channel.send(embed);
					});
			}
		} else {
			const embed = new Juge.RichEmbed()
				.setColor(Juge.util.hexColor.warning)
				.setDescription(':warning: : You must have permission to **manage server** to use this command.')
			message.channel.send(embed);
		}
	}
};