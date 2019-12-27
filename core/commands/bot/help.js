module.exports = {
  name: 'help',
  aliases: ['h'],
  permissions: ['EMBED_LINKS'],
  permissionLevel: 0,
  description: 'Shows details about a command',
  usage: '<command>',
  category: 'bot',
  guildOnly: false,
  params: false,
  cooldown: 5,
  enabled: true,
  execute(client, message, params) {
    const [ command ] = params;

    if (client.commands.has(command)) {
      const {
        name,
        aliases,
        description,
        usage
      } = client.commands.get(command);

      const embed = new client.RichEmbed()
        .setColor(client.util.hexColor(message))
        .setTitle(`:mag: ${name}`)
        .setDescription(description)
        .addField(':page_facing_up: Usage', client.util.sendCode(`${name} ${usage}`, { code: 'fix' }))

        if (aliases.length) embed.addField(':paperclip: Aliases', client.util.sendCode(aliases.join(' '), { code: 'fix' }));

      message.channel.send(embed);
    }
  }
};
