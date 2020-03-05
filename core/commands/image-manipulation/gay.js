const { DiscordUtils, JimpUtils } = require('../../');

module.exports = {
	name: 'gay',
	aliases: ['gai', 'rainbow'],
	description: 'Generates avatar photo with rainbow filter',
	usage: '<user>',
	category: 'images',
	requirements: { botPermissions: ['EMBED_LINKS', 'ATTACH_FILES'], typing: true },
	cooldown: 10,
	async execute(client, message) {
		const avatarURL = await DiscordUtils.fetchAvatarURL(message, { size: 512 });

		message.channel.send(new client.MessageAttachment(
			await JimpUtils.composite(avatarURL, 'png/gay.png'),
			'gay.png'
		));
	}
};
