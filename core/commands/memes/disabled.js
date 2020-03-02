const { JimpUtils } = require('../../');

module.exports = {
  name: 'disabled',
  aliases: [],
  description: '',
  usage: '<user>',
  category: 'memes',
  requirements: { botPermissions: ['EMBED_LINKS', 'ATTACH_FILES'], typing: true },
  cooldown: 10,
  avatarOptions: { format: 'jpg', dynamic: true },
  async execute(client, message, params) {
    const avatarURL = message.mentions.users.size
    ? message.mentions.users.first().displayAvatarURL(this.avatarOptions)
    : message.author.displayAvatarURL(this.avatarOptions);

    message.channel.send({
      files: [{
        attachment: await JimpUtils.composite(avatarURL, 'jpg/disabled.jpg', {
          size: 157,
          position: [390, 252],
          invertBase: true,
          mime: 'jpg'
        }),
        name: 'disabled.jpg'
      }]
    });
  }
};
