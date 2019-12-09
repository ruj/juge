const Booru = require('booru');

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
	async execute(Juge, message, params) {
		if (!message.content.toUpperCase().includes('LOLI', 'GORE')) {
			try {
				const posts = await Booru.search('rule34', [ params.join('_') ], { limit: 1, random: true });
			
				if (posts.length) {
					const embed = new Juge.RichEmbed()
						.setColor(Juge.util.hexColor.embed(message))
						.setImage(posts[0].fileUrl)
					message.channel.send(embed);
				} else {
					throw new Error('No results found');
				}
			} catch (error) {
				const embed = new Juge.RichEmbed()
					.setColor(Juge.util.hexColor.error)
					.setDescription(`:x: : Oops, **${error.message}**`)
				message.channel.send(embed);
			}
		} else {
			const embed = new Juge.RichEmbed()
				.setColor(Juge.util.hexColor.warning)
				.setDescription(':warning: : I can not send it here, not even on NSFW channels.')
			message.channel.send(embed);
		}
	}
};
