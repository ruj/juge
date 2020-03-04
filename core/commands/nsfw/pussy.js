const { RandomRedditPost } = require('../../');

module.exports = {
	name: 'pussy',
	aliases: ['vagina'],
	description: 'Pussy images',
	category: 'nsfw',
	requirements: { nsfwOnly: true, botPermissions: ['EMBED_LINKS'] },
	async execute(client, message) {
		await RandomRedditPost(client, message, this);
	}
};
