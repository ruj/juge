const { JimpUtils } = require('../../');

module.exports = {
	name: 'gay',
	aliases: ['gai', 'rainbow'],
	description: 'Generates avatar photo with rainbow filter',
	usage: '<user>',
	category: 'images',
	requirements: { botPermissions: ['EMBED_LINKS', 'ATTACH_FILES'], typing: true },
	cooldown: 10,
	avatarOptions: { format: 'png', dynamic: true },
	async execute(client, message, params) {
		const avatarURL = message.mentions.users.size
		? message.mentions.users.first().displayAvatarURL(this.avatarOptions)
		: message.author.displayAvatarURL(this.avatarOptions);

		message.channel.send({
			files: [{
				attachment: await JimpUtils.composite(avatarURL, 'png/gay.png', { size: 512 }),
				name: 'gay.png'
			}]
		});
	}
};
