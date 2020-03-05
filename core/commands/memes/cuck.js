const { DiscordUtils, JimpUtils } = require('../../');

module.exports = {
  name: 'cuck',
  aliases: [],
  description: '',
  usage: '<user>',
  category: 'memes',
  requirements: { botPermissions: ['EMBED_LINKS', 'ATTACH_FILES'], typing: true },
  cooldown: 10,
  async execute(client, message) {
    const avatarURL = await DiscordUtils.fetchAvatarURL(message, { size: 512 });

    message.channel.send(new client.MessageAttachment(
      await JimpUtils.composite(avatarURL, 'png/cuck.png'),
      'cuck.png'
    ));
  }
};
