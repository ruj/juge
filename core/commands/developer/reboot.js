const ms = require('ms');

module.exports = {
  name: 'reboot',
  aliases: ['restart'],
  permissions: ['EMBED_LINKS'],
  permissionLevel: 9,
  description: 'Client reboot',
  usage: '[interval]',
  category: 'developer',
  guildOnly: false,
  params: true,
  cooldown: 0,
  enabled: true,
  execute(Juge, message, params) {
    const embed = new Juge.RichEmbed()
      .setColor(Juge.util.hexColor.embed(message))
      .setDescription(`:no_good::skin-tone-1: : Rebooting... I'll be right back!`)
    message.channel.send(embed)
      .then(() => Juge.destroy())
      .then(() => setTimeout(() => Juge.login(process.env.JUGE_TOKEN), ms(params[0])))
      .catch((error) => Juge.log(error.message, { tags: ['commands', 'reboot', 'error'], color: 'red' }));
  }
};
