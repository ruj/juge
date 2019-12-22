const { RandomBooruPost } = require('../../');

module.exports = {
	name: 'rule34',
	aliases: ['r34'],
	permissions: ['EMBED_LINKS'],
	permissionLevel: 0,
	description: 'Searches for images on rule34.xxx',
	usage: '[search query]',
	category: 'nsfw',
	guildOnly: false,
	params: true,
	cooldown: 10,
	enabled: true,
	async execute(client, message, params) {
		await RandomBooruPost(client, message, params, this);
	}
};
