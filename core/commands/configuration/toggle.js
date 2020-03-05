module.exports = {
	name: 'toggle',
	aliases: ['togglensfw', 'setnsfw'],
	description: 'Enables or disables NSFW of the current channel',
	usage: '<(true|enable)|(false|disable)>',
	category: 'configuration',
	requirements: {
		botPermissions: ['MANAGE_CHANNELS', 'EMBED_LINKS', 'ADD_REACTIONS', 'MANAGE_MESSAGES'],
		permissions: ['MANAGE_CHANNELS']
	},
	cooldown: 30,
	async execute(client, message) {
		if (message.parameters.length && ['TRUE', 'ENABLE'].includes(message.parameters[0].toUpperCase()) && !message.channel.nsfw) {
			message.channel.setNSFW(true)
				.then(() => {
					message.channel.send(new client.MessageEmbed()
						.setColor(client.utils.hexColor('SUCCESS'))
						.setDescription(':white_check_mark: : I **activated** the NSFW filter of this channel.')
					);
				})
				.catch((error) => {
					message.channel.send(new client.MessageEmbed()
						.setColor(client.utils.hexColor('ERROR'))
						.setDescription(`:x: : Oops, **${error.message}**`)
					);
				});
		} else if (message.parameters.length && ['FALSE', 'DISABLE'].includes(message.parameters[0].toUpperCase()) && message.channel.nsfw) {
			message.channel.setNSFW(false)
				.then(() => {
					message.channel.send(new client.MessageEmbed()
						.setColor(client.utils.hexColor('SUCCESS'))
						.setDescription(':white_check_mark: : I **disabled** the NSFW filter of this channel.')
					);
				})
				.catch((error) => {
					message.channel.send(new client.MessageEmbed()
						.setColor(client.utils.hexColor('ERROR'))
						.setDescription(`:x: : Oops, **${error.message}**`)
					);
				});
		} else {
			const _message = await message.channel.send(new client.MessageEmbed()
				.setColor(client.utils.hexColor(message))
				.setDescription(`:tools: : Do you want me to \`${message.channel.nsfw ? 'DISABLE' : 'ENABLE'}\` NSFW content for you on this channel?`)
			);

			await _message.react('✅');
			await _message.react('❌');

			const collector = _message.createReactionCollector((reaction, user) => user.id === message.author.id, { max: 1, time: 60 * 1E3 });

			collector.on('collect', (reaction) => {
				if (reaction.emoji.name === '✅') {
					message.channel.setNSFW(message.channel.nsfw ? false : true).then(() => {
						_message.edit(new client.MessageEmbed()
							.setColor(client.utils.hexColor('SUCCESS'))
							.setDescription(`:white_check_mark: : I **${message.channel.nsfw ? 'activated' : 'disabled'}** the NSFW filter for this channel.`)
						);
						_message.reactions.removeAll();
					});
				} else if (reaction.emoji.name === '❌') {
					_message.edit(new client.MessageEmbed()
						.setColor(client.utils.hexColor(message))
						.setDescription(':octagonal_sign: : **Action canceled**')
					).then((message) => message.delete({ timeout: 2555 }));
					_message.reactions.removeAll();
				}
			});

			await collector.on('end', () => {
				if (collector.total !== 1) {
					_message.edit(new client.MessageEmbed()
						.setColor(client.utils.hexColor('WARNING'))
						.setDescription(':warning: : Time to toggle channel content has expired.')
					);
					_message.reactions.removeAll();
				}
			});
		}
	}
};
