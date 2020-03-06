module.exports = {
	name: 'ping',
	aliases: ['latency'],
	description: 'Latency time',
	category: 'bot',
	requirements: { botPermissions: ['EMBED_LINKS'] },
	async execute(client, message) {
		const _message = await message.channel.send('*Pinging...*');
		const messageLatency = _message.createdTimestamp - message.createdTimestamp;

		_message.edit(new client.MessageEmbed()
			.setColor(client.utils.hexColor(message))
			.setDescription(`P${messageLatency / 100 < 100 ? 'o' : 'o'.repeat(messageLatency / 100)}ng!`)
			.addFields([
				{
					name: ':ping_pong: Message',
					value: client.utils.sendCode(`${messageLatency}ms`, { code: 'js' })
				}, {
					name: ':heartpulse: Heartbeat',
					value: client.utils.sendCode(`${Math.floor(client.ws.ping)}ms`, { code: 'js' })
				}
			])
		);
	}
};
