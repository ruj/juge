const moment = require('moment');

module.exports = {
  name: 'gotcha',
  aliases: [],
  description: 'Reveals information from a specific speech',
  usage: '[message]',
  category: 'developer',
  requirements: { devOnly: true, parameters: true },
  execute(client, message) {
    const speech = /^([0-9]){18}$/.test(message.parameters[0])
    ? client.speeches.get(message.parameters[0])
    : client.speeches.find((speech) => speech.parameters.join(' ').toLowerCase().startsWith(message.parameters.join(' ').toLowerCase()));

    if (speech) {
      message.channel.send(new client.MessageEmbed()
        .setColor(client.utils.hexColor(message))
        .setAuthor(speech.author.tag, speech.author.displayAvatarURL({ dynamic: true, size: 64 }))
        .setDescription(speech.parameters.join(' '))
        .setFooter(moment(speech.createdTimestamp).format('LLL'))
      );
    } else {
      message.channel.send(new client.MessageEmbed()
        .setColor(client.utils.hexColor('ERROR'))
        .setDescription(':x: : Oops, **I don\'t remember who said that.**')
      );
    }
  }
};
