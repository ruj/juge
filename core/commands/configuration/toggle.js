module.exports = {
	name: 'toggle',
	aliases: ['togglensfw', 'setnsfw'],
	permissions: ['MANAGE_CHANNELS', 'EMBED_LINKS', 'ADD_REACTIONS', 'MANAGE_MESSAGES'],
	permissionLevel: 5,
	description: 'Enables or disables NSFW of the current channel',
	usage: '<(true|enable)|(false|disable)>',
	category: 'configuration',
	guildOnly: true,
	params: false,
	cooldown: 30,
	enabled: true,
	async execute(Juge, message, params) {
		if (params.length && [ 'TRUE', 'ENABLE' ].includes(params[0].toUpperCase()) && !message.channel.nsfw) {
			const embed = new Juge.RichEmbed()
				.setColor(Juge.util.hexColor.success)
				.setDescription(':white_check_mark: : I **activated** the NSFW filter of this channel.')
			message.channel.setNSFW(true)
				.then(message.channel.send(embed))
				.catch((error) => {
					const embed = new Juge.RichEmbed()
						.setColor(Juge.util.hexColor.error)
						.setDescription(`:x: : Oops, **${error.message}**`)
					message.channel.send(embed);
				});
		} else if (params.length && [ 'FALSE', 'DISABLE' ].includes(params[0].toUpperCase()) && message.channel.nsfw) {
			const embed = new Juge.RichEmbed()
				.setColor(Juge.util.hexColor.success)
				.setDescription(':white_check_mark: : I **disabled** the NSFW filter of this channel.')
			message.channel.setNSFW(false)
				.then(message.channel.send(embed))
				.catch((error) => {
					const embed = new Juge.RichEmbed()
						.setColor(Juge.util.hexColor.error)
						.setDescription(`:x: : Oops, **${error.message}**`)
					message.channel.send(embed);
				});
		} else {
			const embed = new Juge.RichEmbed()
				.setColor(Juge.util.hexColor.embed(message))
				.setDescription(`:tools: : Do you want me to \`${message.channel.nsfw ? 'DISABLE' : 'ENABLE'}\` NSFW content for you on this channel?`)
			const _message = await message.channel.send(embed);

			await _message.react('✅');
			await _message.react('❌');

			const collector = _message.createReactionCollector((reaction, user) => user.id === message.author.id, { max: 1, time: 60 * 1E3 });

			collector.on('collect', (react) => {
				if (react.emoji.name === '✅') {
					const embed = new Juge.RichEmbed()
						.setColor(Juge.util.hexColor.success)
						.setDescription(`:white_check_mark: : I **${message.channel.nsfw ? 'disabled' : 'activated'}** the NSFW filter for this channel.`)
					message.channel.setNSFW(message.channel.nsfw ? false : true).then(() => {
						_message.edit(embed);
						_message.clearReactions();
					});
				} else if (react.emoji.name === '❌') {
					const embed = new Juge.RichEmbed()
						.setColor(Juge.util.hexColor.embed(message))
						.setDescription(':octagonal_sign: : **Action canceled**')
					_message.edit(embed).then((m) => m.delete(2555));
					_message.clearReactions();
				}
			});

			await collector.on('end', () => {
				if (collector.total !== 1) {
					const embed = new Juge.RichEmbed()
						.setColor(Juge.util.hexColor.warning)
						.setDescription(':warning: : Time to toggle channel content has expired.')
					_message.edit(embed);
					_message.clearReactions();
				}
			});
		}
	}
};
