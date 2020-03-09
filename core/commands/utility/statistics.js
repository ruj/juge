const { CommandRepository } = require('../../database/repositories');

module.exports = {
  name: 'statistics',
  aliases: ['stats'],
  description: '',
  category: 'utility',
  requirements: { botPermissions: ['EMBED_LINKS'] },
  cooldown: 15,
  async execute(client, message) {
    const commands = await CommandRepository.findAll();

    message.channel.send(new client.MessageEmbed()
      .setColor(client.utils.hexColor(message))
      .setTitle(':notepad_spiral: Command statistics')
      .setDescription(client.utils.sendCode(commands
        .sort((a, b) => b.count - a.count)
        .slice(0, 15)
        .map((command, index) => `${client.utils.leading((index + 1).toString(), { width: 2 })} : ${command.name} -- ${command.count}`)
        .join('\n'), { code: 'excel' }))
    );
  }
};