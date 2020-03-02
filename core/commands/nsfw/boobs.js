const Boobs = require('../../apis/OpenBoobs.js');

const BASE_URL = 'http://media.oboobs.ru';

module.exports = {
	name: 'boobs',
	aliases: ['boobies', 'bobs'],
	description: 'Boob images',
	usage: '<noise>',
	category: 'nsfw',
	requirements: { nsfwOnly: true, botPermissions: ['EMBED_LINKS'] },
	async execute(client, message, params) {
		try {
			if (!params.length) {
				const boobs = await Boobs.getBoobs();

				message.channel.send(new client.MessageEmbed()
					.setColor(client.utils.hexColor(message))
					.setImage(`${BASE_URL}/${boobs[0].preview}`)
				);
			} else if (params[0].toUpperCase() === 'NOISE') {
				const noise = await Boobs.getNoise();

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
