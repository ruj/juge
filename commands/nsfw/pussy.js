exports.run = (Discord, b, message, params) => {
	if (!message.channel.permissionsFor(b.user.id).has('MANAGE_MESSAGES')) {
		const embed = new Discord.RichEmbed()
				.setColor(CONTENT.COLORS.ERROR)
				.setDescription(CONTENT.MESSAGES.MANAGEMSGS)
		message.channel.send({ embed })
	} else {
		if (!message.channel.nsfw) {
			const embed = new Discord.RichEmbed()
					.setColor(CONTENT.COLORS.ERROR)
					.setAuthor(CONTENT.NSFW.ERROR.AUTHOR)
					.setDescription(CONTENT.NSFW.ERROR.DESCRIPTION)
					.setImage(CONTENT.NSFW.ERROR.IMAGE)
			message.channel.send({ embed })
		} else if (talkedRecently.has(message.author.id)) {
			const embed = new Discord.RichEmbed()
					.setColor(CONTENT.COLORS.ERROR)
					.setDescription(`**${message.member.displayName}**, please wait **5** seconds!`)
			message.delete()
			message.channel.send({ embed }).then((msg) => msg.delete(5000))
		} else {
			snekfetch.get('https://nekobot.xyz/api/image?type=pussy').then((r) => {
				randomPuppy(Utils.randomItem(CONTENT.NSFW.COMMANDS.PUSSY)).then((url) => {
					const result = [url, r.body.message][Math.floor(Math.random() * [url, r.body.message].length)];
					const embed = new Discord.RichEmbed()
							.setColor(message.guild ? message.guild.me.displayHexColor : '#99AAB5')
							.setImage(result)
					message.channel.send({ embed })
					talkedRecently.add(message.author.id)
					setTimeout(() => talkedRecently.delete(message.author.id), 5000);
				});
			});
		}
	}
};

exports.config = {
    name: 'pussy',
    aliases: ['vagina'],
    permission: '',
    permlevel: 0,
    description: 'Random image of pussy',
    usage: `${CONFIG.PREFIX}pussy`,
    category: 'nsfw',
    enabled: true
};