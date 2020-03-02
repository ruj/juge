const { JimpUtils } = require('../../');

module.exports = {
  name: 'cuck',
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
        attachment: await JimpUtils.composite(avatar, 'png/cuck.png', { size: 512 }),
        name: 'cuck.png'
      }]
    });
  }
};
