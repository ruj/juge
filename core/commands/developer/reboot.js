const ms = require('ms');

module.exports = {
  name: 'reboot',
  aliases: ['restart'],
  description: 'Client reboot',
  usage: '[interval]',
  category: 'developer',
  requirements: { devOnly: true, parameters: true, botPermissions: ['EMBED_LINKS'] },
  execute(client, message) {
    message.channel.send(new client.MessageEmbed()
      .setColor(client.utils.hexColor(message))
      .setDescription(`:no_good::skin-tone-1: : Rebooting... I'll be right back!`)
    )
    .then(() => client.destroy())
    .then(() => setTimeout(() => client.login(), ms(message.params[0])))
    .catch((error) => client.log(error.message, { tags: ['commands', 'reboot'], color: 'red' }));
  }
};
