module.exports = {
  name: 'say',
  aliases: ['sayd', 'repeat'],
  description: 'Send a text message made by you',
  usage: '[text]',
  category: 'bot',
  requirements: { parameters: true, botPermissions: ['MANAGE_MESSAGES'] },
  async execute(client, message) {
    message.delete();
    message.channel.send(message.parameters.join(' '))
      .then((_message) => client.speeches.set(_message.id, message));
  }
};
