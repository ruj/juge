const { CommandRepository } = require('../../database/repositories');

module.exports = {
  name: 'stats',
  aliases: [],
  description: '',
  category: 'utility',
  requirements: { botPermissions: ['EMBED_LINKS'] },
  cooldown: 15,
  async execute(client, message) {
    const commands = await CommandRepository.findAll();

    message.channel.send(new client.MessageEmbed()
      .setColor(client.utils.hexColor(message))
      .setTitle(':notepad_spiral: Command usage statistics')
      .setDescription(commands
        .sort((a, b) => b.count - a.count)
        .slice(0, 15)
        .map((command, index) => `\`${client.utils.leading(String(index + 1), { width: String(commands.length).length })}\` : **${command.name}** -- ${command.count}`)
        .join('\n'))
    );
  }
};