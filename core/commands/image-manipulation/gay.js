const { resolve } = require('path');
const Jimp = require('jimp');

module.exports = {
	name: 'gay',
	aliases: ['gai'],
	permissions: ['EMBED_LINKS', 'ATTACH_FILES'],
	permissionLevel: 0,
	description: 'Generates avatar photo with rainbow filter',
	usage: '<user>',
	category: 'images',
	guildOnly: false,
	params: false,
	cooldown: 10,
	enabled: true,
	async execute(Juge, message, params) {
		try {
			message.channel.startTyping();
			const avatar = message.mentions.users.size ? message.mentions.users.first().displayAvatarURL : message.author.displayAvatarURL;
			const filter = await Jimp.read(resolve(__dirname, '..', '..', 'assets', 'png', 'gay.png'));
			const image = await Jimp.read(avatar);
			image.resize(512, 512);
			await message.channel.send({ files: [{ attachment: await image.composite(filter, 0, 0).getBufferAsync(Jimp.MIME_PNG), name: 'gay.png' }] }).then(message.channel.stopTyping());
		} catch (error) {
			const embed = new Juge.RichEmbed()
				.setColor(Juge.util.hexColor.error)
				.setDescription(`:x: : Oops, **${error.message}**`)
			message.channel.send(embed).then(message.channel.stopTyping());
		}
	}
};
