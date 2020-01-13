const { RandomNekoBotImage } = require('../../');

module.exports = {
	name: '4k',
	aliases: ['hq'],
	description: 'High quality NSFW content',
	category: 'nsfw',
	requirements: { nsfwOnly: true, botPermissions: ['EMBED_LINKS'] },
	async execute(client, message, params) {
		await RandomNekoBotImage(client, message, this);
	}
};
