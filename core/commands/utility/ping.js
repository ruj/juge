module.exports = {
	name: 'ping',
	aliases: ['latency'],
	permissions: ['EMBED_LINKS'],
	permissionLevel: 0,
	description: 'Latency time',
	usage: '',
	category: 'utility',
	guildOnly: false,
	params: false,
	cooldown: 5,
	enabled: true,
	execute(Juge, message, params) {
		let initialDate = new Date();
		let JugeLatency = new Date() - message.createdAt;
		let messageLatency = new Date() - initialDate;

		const embed = new Juge.RichEmbed()
			.setColor(Juge.util.hexColor(message))
			.setDescription(`P${JugeLatency / 100 < 100 ? 'o' : 'o'.repeat(JugeLatency / 100)}ng!`)
			.addField(':ping_pong: Message', Juge.util.sendCode(`~${Math.round(messageLatency)}ms`, { code: 'js' }), true)
			.addField(':robot: Roboto', Juge.util.sendCode(`${Math.floor(JugeLatency)}ms`, { code: 'js' }), true)
			.addField(':satellite: API', Juge.util.sendCode(`${Math.floor(Juge.ping)}ms`, { code: 'js' }), false)
		message.channel.send(embed);
	}
};
