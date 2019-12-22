const fetch = require('node-fetch');

const BASE_URL = 'https://rra.ram.moe';

module.exports = {
	name: 'gtn',
	aliases: ['comics'],
	permissions: ['EMBED_LINKS'],
	permissionLevel: 0,
	description: 'GreenTeaNeko comics',
	usage: '',
	category: 'nsfw',
	guildOnly: false,
	params: false,
	cooldown: 5,
	enabled: true,
	async execute(client, message, params) {
		try {
			const response = await fetch(`${BASE_URL}/i/r?nsfw=true`);
			const body = await response.json();

			message.channel.send(new client.RichEmbed()
				.setColor(client.util.hexColor(message))
				.setImage(`${BASE_URL}${body.path}`)
			);
		} catch (error) {
			message.channel.send(new client.RichEmbed()
				.setColor(client.util.hexColor('ERROR'))
				.setDescription(`:x: : Oops, **${error.message}**`)
			);
		}
	}
};
