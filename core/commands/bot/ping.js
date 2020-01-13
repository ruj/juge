module.exports = {
	name: 'ping',
	aliases: ['latency'],
	description: 'Latency time',
	category: 'bot',
	requirements: { botPermissions: ['EMBED_LINKS'] },
	cooldown: 5,
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
