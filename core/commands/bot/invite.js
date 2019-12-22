const invitationPhrases = require('../../assets/json/invitation_phrases.json');

const INVITE_LINK = `https://discordapp.com/oauth2/authorize?client_id={{JUGE_ID}}&permissions=${process.env.JUGE_PERMISSIONS}&scope=bot`;

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
	execute(client, message, params) {
		message.channel.send(new client.RichEmbed()
			.setColor(client.util.hexColor(message))
			.setDescription(client.util.randomItem(invitationPhrases)
				.replace('{{INVITE_LINK}}', INVITE_LINK)
				.replace('{{JUGE_ID}}', client.user.id)
			)
		);
	}
};
