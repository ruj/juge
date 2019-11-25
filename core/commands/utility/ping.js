module.exports = {
	name: 'ping',
	aliases: [],
	permissions: [],
	permissionLevel: 0,
	description: 'Message response time',
	usage: '',
	category: 'utility',
	params: false,
	cooldown: 5,
	enabled: true,
	execute(Juge, message, params) {
		let initialDate = new Date();
		let JugeLatency = new Date() - message.createdAt;
		let messageLatency = new Date() - initialDate;

		const embed = new Juge.RichEmbed()
			.setColor(Juge.util.hexColor.embed(message))
			.setDescription(`P${JugeLatency / 100 < 100 ? 'o' : 'o'.repeat(JugeLatency / 100)}ng!`)
			.addField(':ping_pong: Message', Juge.util.sendCode(`~${Math.round(messageLatency)}ms`, { code: 'js' }), true)
			.addField(':robot: Roboto', Juge.util.sendCode(`${Math.floor(JugeLatency)}ms`, { code: 'js' }), true)
			.addField(':satellite: API', Juge.util.sendCode(`${Math.floor(Juge.ping)}ms`, { code: 'js' }), false)
		message.channel.send(embed);
	}
};
