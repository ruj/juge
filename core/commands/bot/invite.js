const invitationPhrases = require('../../assets/json/invitation_phrases.json');

module.exports = {
	name: 'invite',
	aliases: ['botinvite'],
	permissions: ['EMBED_LINKS'],
	permissionLevel: 0,
	description: 'Bot invitation link',
	usage: '',
	category: 'bot',
	guildOnly: false,
	params: false,
	cooldown: 0,
	enabled: true,
	async execute(client, message, params) {
		message.channel.send(new client.RichEmbed()
			.setColor(client.util.hexColor(message))
			.setDescription(client.util.randomItem(invitationPhrases)
				.replace('{{INVITE_LINK}}', await client.generateInvite(Number(process.env.JUGE_PERMISSIONS)))
			)
		);
	}
};
