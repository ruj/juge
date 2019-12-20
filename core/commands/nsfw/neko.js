const { RandomNekoDotLifeImage } = require('../../');

module.exports = {
	name: 'neko',
	aliases: ['nekos', 'catgirl'],
	permissions: ['EMBED_LINKS'],
	permissionLevel: 0,
	description: 'Nekos!',
	usage: '',
	category: 'nsfw',
	guildOnly: false,
	params: false,
	cooldown: 5,
	enabled: true,
	async execute(Juge, message, params) {
		await RandomNekoDotLifeImage(Juge, message, this);
	}
};
