module.exports = {
	name: 'pussy',
	aliases: ['vagina'],
	permissions: ['EMBED_LINKS'],
	permissionLevel: 0,
	description: 'Pussy images',
	usage: '',
	category: 'nsfw',
	guildOnly: false,
	params: false,
	cooldown: 5,
	enabled: true,
	async execute(Juge, message, params) {
		try {
			const pussy = await Juge.Reddit(Juge.config.subreddits[this.name]);
			const embed = new Juge.RichEmbed()
				.setColor(Juge.util.hexColor(message))
				.setImage(pussy.url)
			message.channel.send(embed);
		} catch (error) {
			const embed = new Juge.RichEmbed()
				.setColor(Juge.util.hexColor('ERROR'))
				.setDescription(`:x: : Oops, **${error.message}**`)
			message.channel.send(embed);
		}
	}
};
