const fetch = require('node-fetch');

const BASE_URL = 'https://rra.ram.moe';

module.exports = {
	name: 'gtn',
	aliases: ['comics'],
	description: 'GreenTeaNeko comics',
	category: 'nsfw',
	requirements: { nsfwOnly: true, botPermissions: ['EMBED_LINKS'] },
	async execute(client, message) {
		try {
			const body = await fetch(`${BASE_URL}/i/r?nsfw=true`).then((response) => response.json());

			message.channel.send(new client.MessageEmbed()
				.setColor(client.utils.hexColor(message))
				.setImage(`${BASE_URL}${body.path}`)
			);
		} catch (error) {
			message.channel.send(new client.MessageEmbed()
				.setColor(client.utils.hexColor('ERROR'))
				.setDescription(`:x: : Oops, **${error.message}**`)
			);
		}
	}
};
