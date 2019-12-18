const Neko = require('../../apis/NekosDotLife.js');

module.exports = {
	name: 'neko',
	aliases: ['nekos', 'catgirl'],
	permissions: ['EMBED_LINKS'],
	permissionLevel: 0,
	description: 'Nekos!',
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
				.setImage(neko.url)
			message.channel.send(embed);
		} catch (error) {
			const embed = new Juge.RichEmbed()
				.setColor(Juge.util.hexColor('ERROR'))
				.setDescription(`:x: : Oops, **${error.message}**`)
			message.channel.send(embed);
		}
	}
};
