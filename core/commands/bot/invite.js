const invitationPhrases = require('../../assets/json/invitation_phrases.json');

module.exports = {
	name: 'invite',
	aliases: ['botinvite'],
	description: 'Bot invitation link',
	category: 'bot',
	requirements: { botPermissions: ['EMBED_LINKS'] },
	async execute(client, message, params) {
		message.channel.send(new client.RichEmbed()
			.setColor(client.util.hexColor(message))
			.setDescription(client.util.randomItem(invitationPhrases)
				.replace('{{INVITE_LINK}}', await client.generateInvite(Number(process.env.JUGE_PERMISSIONS)))
			)
		);
	}
};
