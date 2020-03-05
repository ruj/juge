const { DiscordUtils, JimpUtils } = require('../../');

module.exports = {
  name: 'disabled',
  aliases: [],
  description: '',
  usage: '<user>',
  category: 'memes',
  requirements: { botPermissions: ['EMBED_LINKS', 'ATTACH_FILES'], typing: true },
  cooldown: 10,
  async execute(client, message) {
    const avatarURL = await DiscordUtils.fetchAvatarURL(message, { format: 'jpg', size: 256 });

    message.channel.send(new client.MessageAttachment(
      await JimpUtils.composite(avatarURL, 'jpg/disabled.jpg', {
        size: 157,
        position: [390, 252],
        invertBase: true,
        mime: 'jpg'
      }),
      'disabled.jpg'
    ));
  }
};
