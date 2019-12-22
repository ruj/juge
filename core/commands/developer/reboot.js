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
  execute(client, message, params) {
    message.channel.send(new client.RichEmbed()
      .setColor(client.util.hexColor(message))
      .setDescription(`:no_good::skin-tone-1: : Rebooting... I'll be right back!`)
    )
    .then(() => client.destroy())
    .then(() => setTimeout(() => client.login(process.env.JUGE_TOKEN), ms(params[0])))
    .catch((error) => client.log(error.message, { tags: ['commands', 'reboot'], color: 'red' }));
  }
};
