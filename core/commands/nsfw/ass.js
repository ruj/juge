module.exports = {
	name: 'ass',
	aliases: ['butt', 'booty', 'butts'],
	permissions: ['EMBED_LINKS'],
	permissionLevel: 0,
	description: 'Butt images',
	usage: '',
	category: 'nsfw',
	guildOnly: false,
	params: false,
	cooldown: 5,
	enabled: true,
	async execute(Juge, message, params) {
		const Butts = require('../../apis/OpenButts.js');

		try {
			const butts = await Butts.getButts();
			const embed = new Juge.RichEmbed()
				.setColor(Juge.util.hexColor.embed(message))
				.setImage(`http://media.obutts.ru/${butts[0].preview}`)
			message.channel.send(embed);
		} catch (error) {
			const embed = new Juge.RichEmbed()
				.setColor(Juge.util.hexColor.error)
				.setDescription(`:x: : ${error.message}`)
			message.channel.send(embed);
		}
	}
};
