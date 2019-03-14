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
			snekfetch.get(`http://media.oboobs.ru/boobs_preview/${('00000' + Utils.randomRange(1051, 13610)).slice(-5)}.jpg`).then((r) => {
				const embed = new Discord.RichEmbed()
						.setColor(message.guild ? message.guild.me.displayHexColor : '#99AAB5')
						.setImage(`http://media.oboobs.ru/boobs_preview/${('00000' + Utils.randomRange(1051, 13610)).slice(-5)}.jpg`)
				message.channel.send({ embed })
				talkedRecently.add(message.author.id)
				setTimeout(() => talkedRecently.delete(message.author.id), 5000);
			});
		}
	}
};

exports.config = {
    name: 'boobs',
    aliases: ['boobies', 'bobs'],
    permission: '',
    permlevel: 0,
    description: 'Show a picture of boobs!',
    usage: `${CONFIG.PREFIX}boobs`,
    category: 'nsfw',
    enabled: true
};