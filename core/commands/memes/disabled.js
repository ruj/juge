const { JimpUtils } = require('../../');

module.exports = {
  name: 'disabled',
  aliases: [],
  description: '',
  usage: '<user>',
  category: 'memes',
  requirements: { botPermissions: ['EMBED_LINKS', 'ATTACH_FILES'], typing: true },
  cooldown: 10,
  async execute(client, message, params) {
    const avatar = message.mentions.users.size ? message.mentions.users.first().displayAvatarURL : message.author.displayAvatarURL;

    message.channel.send({
      files: [{
        attachment: await JimpUtils.composite(avatar, 'jpg/disabled.jpg', {
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
