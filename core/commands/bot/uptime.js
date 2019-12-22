module.exports = {
  name: 'uptime',
  aliases: ['up'],
  permissions: ['EMBED_LINKS'],
  permissionLevel: 0,
  description: 'Time the client is awake',
  usage: '',
  category: 'bot',
  guildOnly: false,
  params: false,
  cooldown: 0,
  enabled: true,
  execute(client, message, params) {
    message.channel.send(new client.RichEmbed()
      .setColor(client.util.hexColor(message))
      .setDescription(`:clock4: : ${client.util.uptime(client.uptime)}`)
    );
  }
};
