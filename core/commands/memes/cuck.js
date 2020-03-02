const { JimpUtils } = require('../../');

module.exports = {
  name: 'cuck',
  aliases: [],
  description: '',
  usage: '<user>',
  category: 'memes',
  requirements: { botPermissions: ['EMBED_LINKS', 'ATTACH_FILES'], typing: true },
  cooldown: 10,
  avatarOptions: { format: 'png', dynamic: true },
  async execute(client, message, params) {
    const avatarURL = message.mentions.users.size
    ? message.mentions.users.first().displayAvatarURL(this.avatarOptions)
    : message.author.displayAvatarURL(this.avatarOptions);

    message.channel.send({
      files: [{
        attachment: await JimpUtils.composite(avatarURL, 'png/cuck.png', { size: 512 }),
        name: 'cuck.png'
      }]
    });
  }
};
