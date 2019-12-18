const Neko = require('../../apis/NekoBot.js');

module.exports = {
	name: '4k',
	aliases: ['hq'],
	permissions: ['EMBED_LINKS'],
	permissionLevel: 0,
	description: 'High quality NSFW content',
	usage: '',
	category: 'nsfw',
	guildOnly: false,
	params: false,
	cooldown: 5,
	enabled: true,
	async execute(Juge, message, params) {
		try {
			const neko = await Neko.image(this.name);
			const embed = new Juge.RichEmbed()
				.setColor(Juge.util.hexColor(message))
				.setImage(neko.message)
			message.channel.send(embed);
		} catch (error) {
			const embed = new Juge.RichEmbed()
				.setColor(Juge.util.hexColor('ERROR'))
				.setDescription(`:x: : Oops, **${error.message}**`)
			message.channel.send(embed);
		}
	}
};
