const fetch = require('node-fetch');

const BASE_URL = 'https://rra.ram.moe';

module.exports = {
	name: 'gtn',
	aliases: ['comics'],
	description: 'GreenTeaNeko comics',
	category: 'nsfw',
	requirements: { nsfwOnly: true, botPermissions: ['EMBED_LINKS'] },
	async execute(client, message, params) {
		try {
			const response = await fetch(`${BASE_URL}/i/r?nsfw=true`);
			const body = await response.json();

			message.channel.send(new client.RichEmbed()
				.setColor(client.utils.hexColor(message))
				.setImage(`${BASE_URL}${body.path}`)
			);
		} catch (error) {
			message.channel.send(new client.RichEmbed()
				.setColor(client.utils.hexColor('ERROR'))
				.setDescription(`:x: : Oops, **${error.message}**`)
			);
		}
	}
};
