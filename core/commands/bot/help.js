module.exports = {
  name: 'help',
  aliases: ['h'],
  description: 'Shows details about a command',
  usage: '<command>',
  category: 'bot',
  requirements: { botPermissions: ['EMBED_LINKS'] },
  execute(client, message, params) {
    let [ command ] = params;
    command = command.toLowerCase();

    if (!client.commands.has(command)) command = client.commands.filter(({ aliases }) => aliases.includes(command)).map(({ name }) => name)[0];

    if (client.commands.has(command)) {
      const {
        name,
        aliases,
        description,
        usage
      } = client.commands.get(command);

      const embed = new client.RichEmbed()
        .setColor(client.utils.hexColor(message))
        .setTitle(`:mag: ${name}`)
        .setDescription(description)
        .addField(':page_facing_up: Usage', client.utils.sendCode(`${message.content.replace(/(help|h).*/g, '')}${name} ${usage}`, { code: 'fix' }))

        if (aliases.length) embed.addField(':paperclip: Aliases', client.utils.sendCode(aliases.join(' '), { code: 'fix' }));

      message.channel.send(embed);
    }
  }
};
