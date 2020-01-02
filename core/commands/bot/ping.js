module.exports = {
	name: 'ping',
	aliases: ['latency'],
	permissions: ['EMBED_LINKS'],
	permissionLevel: 0,
	description: 'Latency time',
	usage: '',
	category: 'bot',
	guildOnly: false,
	params: false,
	cooldown: 5,
	enabled: true,
	execute(client, message, params) {
		let initialDate = new Date();
		let JugeLatency = new Date() - message.createdAt;
		let messageLatency = new Date() - initialDate;

		message.channel.send(new client.RichEmbed()
			.setColor(client.util.hexColor(message))
			.setDescription(`P${JugeLatency / 100 < 100 ? 'o' : 'o'.repeat(JugeLatency / 100)}ng!`)
			.addField(':ping_pong: Message', client.util.sendCode(`~${Math.round(messageLatency)}ms`, { code: 'js' }), true)
			.addField(':robot: Roboto', client.util.sendCode(`${Math.floor(JugeLatency)}ms`, { code: 'js' }), true)
			.addField(':satellite: API', client.util.sendCode(`${Math.floor(client.ping)}ms`, { code: 'js' }), false)
		);
	}
};
