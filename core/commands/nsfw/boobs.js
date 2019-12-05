const Boobs = require('../../apis/OpenBoobs.js');

module.exports = {
	name: 'boobs',
	aliases: ['boobies', 'bobs'],
	permissions: ['EMBED_LINKS'],
	permissionLevel: 0,
	description: 'Boob images',
	usage: '<noise>',
	category: 'nsfw',
	guildOnly: false,
	params: false,
	cooldown: 5,
	enabled: true,
	async execute(Juge, message, params) {
		try {
			if (params.length < 1) {
				const boobs = await Boobs.getBoobs();
				const embed = new Juge.RichEmbed()
					.setColor(Juge.util.hexColor.embed(message))
					.setImage(`http://media.oboobs.ru/${boobs[0].preview}`)
				message.channel.send(embed);
			} else if (params[0].toUpperCase() === 'NOISE') {
				const noise = await Boobs.getNoise();
				const embed = new Juge.RichEmbed()
					.setColor(Juge.util.hexColor.embed(message))
					.setImage(`http://media.oboobs.ru/${noise[0].preview}`)
				message.channel.send(embed);
			}
		} catch (error) {
			const embed = new Juge.RichEmbed()
				.setColor(Juge.util.hexColor.error)
				.setDescription(`:x: : Oops, **${error.message}**`)
			message.channel.send(embed);
		}
	}
};
