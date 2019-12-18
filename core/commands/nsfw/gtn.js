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
	async execute(Juge, message, params) {
		try {
			const response = await fetch(`${BASE_URL}/i/r?nsfw=true`);
			const body = await response.json();
			const embed = new Juge.RichEmbed()
				.setColor(Juge.util.hexColor(message))
				.setImage(`${BASE_URL}${body.path}`)
			message.channel.send(embed);
		} catch (error) {
			const embed = new Juge.RichEmbed()
				.setColor(Juge.util.hexColor('ERROR'))
				.setDescription(`:x: : Oops, **${error.message}**`)
			message.channel.send(embed);
		}
	}
};
