exports.run = (Discord, b, message, params) => {
	if (!message.channel.permissionsFor(b.user).has('MANAGE_MESSAGES')) {
		const embed = new Discord.RichEmbed()
				.setColor(CONFIG.COLORS.ERROR)
				.setDescription(CONFIG.MESSAGES.MANAGEMSGS)
		message.channel.send({ embed })
	} else {
		var max = 5511;
		var min = 1000;
		var MathRan = Math.floor(Math.random() * (max - min + 0)) + min;
		var MathLoL = Math.round(MathRan);
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
			message.channel.send({ embed }).then(msg => { msg.delete(5000) });
		} else {
			snekfetch.get(`http://media.obutts.ru/butts_preview/0${MathLoL}.jpg`).then(r => {
				const embed = new Discord.RichEmbed()
						.setColor(message.guild ? message.guild.me.displayHexColor : '#99AAB5')
						.setImage(`http://media.obutts.ru/butts_preview/0${MathLoL}.jpg`)
				message.channel.send({ embed })
				talkedRecently.add(message.author.id);
				setTimeout(() => {talkedRecently.delete(message.author.id)}, 5000);
			});
		}
	}
};

exports.conf = {
	enabled: true,
  	guildOnly: true,
  	aliases: ['butt', 'booty', 'butts'],
  	permLevel: 0
};

exports.help = {
  	name : 'ass',
  	description: 'A random picture of...ASS!!',
  	usage: 'ass'
};