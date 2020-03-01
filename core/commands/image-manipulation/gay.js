const { JimpUtils } = require('../../');
const { resolve } = require('path');

module.exports = {
	name: 'gay',
	aliases: ['gai', 'rainbow'],
	description: 'Generates avatar photo with rainbow filter',
	usage: '<user>',
	category: 'images',
	requirements: { botPermissions: ['EMBED_LINKS', 'ATTACH_FILES'] },
	cooldown: 10,
	async execute(client, message, params) {
		message.channel.startTyping();
		const avatar = message.mentions.users.size ? message.mentions.users.first().displayAvatarURL : message.author.displayAvatarURL;
		const composition = resolve(__dirname, '..', '..', 'assets', 'png', 'gay.png');

		message.channel.send({
			files: [{
				attachment: await JimpUtils.composite(avatar, composition, { size: [512, 512] }),
				name: 'gay.png'
			}]
		}).then(message.channel.stopTyping());
	}
};
