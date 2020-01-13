const { RandomBooruPost } = require('../../');

module.exports = {
	name: 'rule34',
	aliases: ['r34'],
	description: 'Searches for images on rule34.xxx',
	usage: '[search query]',
	category: 'nsfw',
	requirements: { nsfwOnly: true, parameters: true, botPermissions: ['EMBED_LINKS'] },
	cooldown: 10,
	async execute(client, message, params) {
		await RandomBooruPost(client, message, params, this);
	}
};
