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
  execute(Juge, message, params) {
    const embed = new Juge.RichEmbed()
      .setColor(Juge.util.hexColor(message))
      .setDescription(`:clock4: : ${Juge.util.uptime(Juge.uptime)}`)
    message.channel.send(embed);
  }
};
