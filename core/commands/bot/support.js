module.exports = {
	name: 'support',
	aliases: ['issue'],
	description: 'Support link!',
	category: 'bot',
	requirements: { botPermissions: ['EMBED_LINKS'] },
	async execute(client, message) {
		message.channel.send(new client.MessageEmbed()
			.setColor(client.utils.hexColor(message))
			.setDescription(`Report any bugs, questions or suggestions in the issues tab of our **[repository!](https://github.com/tenasatupitsyn/juge/issues)**`)
		);
	}
};
