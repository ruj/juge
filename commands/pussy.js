exports.run = (Discord, b, message, params) => {
	if (!message.channel.permissionsFor(b.user).has('MANAGE_MESSAGES')) {
		const embed = new Discord.RichEmbed()
				.setColor(CONFIG.COLORS.ERROR)
				.setDescription(CONFIG.MESSAGES.MANAGEMSGS)
		message.channel.send({ embed })
	} else {
		const embed = new Discord.RichEmbed()
				.setColor(CONFIG.COLORS.ERROR)
				.setAuthor(CONFIG.NSFW.ERROR.AUTHOR)
				.setDescription(CONFIG.NSFW.ERROR.DESCRIPTION)
				.setImage(CONFIG.NSFW.ERROR.IMAGE)
		if (!message.channel.nsfw) return message.channel.send({ embed });
		if (talkedRecently.has(message.author.id)) {
			const embed = new Discord.RichEmbed()
					.setColor(CONFIG.COLORS.ERROR)
					.setDescription(`**${message.author.username}**, please wait **5** seconds!`)
			message.delete()
			message.channel.send({ embed }).then(msg => {msg.delete(5000)});
		} else {
			snekfetch.get('https://nekobot.xyz/api/image?type=pussy').then(res => {
				var subreddits = CONFIG.NSFW.CMDS.PUSSY
				var sub = subreddits[Math.round(Math.random() * (subreddits.length - 1))];
				randomPuppy(sub).then(url => {
					var result = [url, res.body.message][Math.floor(Math.random() * [url, res.body.message].length)];
					const embed = new Discord.RichEmbed()
							.setColor(message.guild ? message.guild.me.displayHexColor : '#99AAB5')
							.setImage(result)
					message.channel.send({ embed })
					talkedRecently.add(message.author.id);
					setTimeout(() => {talkedRecently.delete(message.author.id)}, 5000);
				});
			});
		}
	}
};

exports.conf = {
	enabled: true,
  	guildOnly: true,
  	aliases: ['vagina'],
  	permLevel: 0
};

exports.help = {
  	name : 'pussy',
  	description: 'Random image of pussy',
  	usage: 'pussy'
};