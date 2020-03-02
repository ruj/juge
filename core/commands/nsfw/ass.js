const Butts = require('../../apis/OpenButts.js');

const BASE_URL = 'http://media.obutts.ru';

module.exports = {
	name: 'ass',
	aliases: ['butt', 'booty', 'butts'],
	description: 'Butt images',
	usage: '<noise>',
	category: 'nsfw',
	requirements: { nsfwOnly: true, botPermissions: ['EMBED_LINKS'] },
	async execute(client, message, params) {
		try {
			if (!params.length) {
				const butts = await Butts.getButts();

				message.channel.send(new client.MessageEmbed()
					.setColor(client.utils.hexColor(message))
					.setImage(`${BASE_URL}/${butts[0].preview}`)
				);
			} else if (params[0].toUpperCase() === 'NOISE') {
				const noise = await Butts.getNoise();

				message.channel.send(new client.MessageEmbed()
					.setColor(client.utils.hexColor(message))
					.setImage(`${BASE_URL}/${noise[0].preview}`)
				);
			}
		} catch (error) {
			message.channel.send(new client.MessageEmbed()
				.setColor(client.utils.hexColor('ERROR'))
				.setDescription(`:x: : Oops, **${error.message}**`)
			);
		}
	}
};
