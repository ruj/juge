const { RandomNekoDotLifeImage } = require('../../');

module.exports = {
	name: 'neko',
	aliases: ['nekos', 'catgirl'],
	description: 'Nekos!',
	category: 'nsfw',
	requirements: { nsfwOnly: true, botPermissions: ['EMBED_LINKS'] },
	async execute(client, message) {
		await RandomNekoDotLifeImage(client, message, this);
	}
};
