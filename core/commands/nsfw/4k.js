const { RandomNekoBotImage } = require('../../');

module.exports = {
	name: '4k',
	aliases: ['hq'],
	permissions: ['EMBED_LINKS'],
	permissionLevel: 0,
	description: 'High quality NSFW content',
	usage: '',
	category: 'nsfw',
	guildOnly: false,
	params: false,
	cooldown: 5,
	enabled: true,
	async execute(client, message, params) {
		await RandomNekoBotImage(client, message, this);
	}
};
