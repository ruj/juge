const invitationPhrases = require('../../assets/json/invitation_phrases.json');

const PERMISSIONS = '59472';
const INVITE_LINK = `https://discordapp.com/oauth2/authorize?client_id={{JUGE_ID}}&permissions=${PERMISSIONS}&scope=bot`;

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
	execute(Juge, message, params) {
		const invite = Juge.util.randomItem(invitationPhrases).replace('{{INVITE_LINK}}', INVITE_LINK).replace('{{JUGE_ID}}', Juge.user.id);
		const embed = new Juge.RichEmbed()
			.setColor(Juge.util.hexColor.embed(message))
			.setDescription(invite)
		message.channel.send(embed);
	}
};
