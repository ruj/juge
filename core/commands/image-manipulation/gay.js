const { JimpUtils } = require('../../');

module.exports = {
	name: 'gay',
	aliases: ['gai', 'rainbow'],
	description: 'Generates avatar photo with rainbow filter',
	usage: '<user>',
	category: 'images',
	requirements: { botPermissions: ['EMBED_LINKS', 'ATTACH_FILES'], typing: true },
	cooldown: 10,
	async execute(client, message, params) {
		const avatar = message.mentions.users.size ? message.mentions.users.first().displayAvatarURL : message.author.displayAvatarURL;

		message.channel.send({
			files: [{
				attachment: await JimpUtils.composite(avatar, 'png/gay.png', { size: 512 }),
				name: 'gay.png'
			}]
		});
	}
};
