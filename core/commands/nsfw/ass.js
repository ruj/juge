const Butts = require('../../apis/OpenButts.js');

const BASE_URL = 'http://media.obutts.ru';

module.exports = {
	name: 'ass',
	aliases: ['butt', 'booty', 'butts'],
	permissions: ['EMBED_LINKS'],
	permissionLevel: 0,
	description: 'Butt images',
	usage: '<noise>',
	category: 'nsfw',
	guildOnly: false,
	params: false,
	cooldown: 5,
	enabled: true,
	async execute(client, message, params) {
		try {
			if (params.length < 1) {
				const butts = await Butts.getButts();

				message.channel.send(new client.RichEmbed()
					.setColor(client.util.hexColor(message))
					.setImage(`${BASE_URL}/${butts[0].preview}`)
				);
			} else if (params[0].toUpperCase() === 'NOISE') {
				const noise = await Butts.getNoise();

				message.channel.send(new client.RichEmbed()
					.setColor(client.util.hexColor(message))
					.setImage(`${BASE_URL}/${noise[0].preview}`)
				);
			}
		} catch (error) {
			message.channel.send(new client.RichEmbed()
				.setColor(client.util.hexColor('ERROR'))
				.setDescription(`:x: : Oops, **${error.message}**`)
			);
		}
	}
};
