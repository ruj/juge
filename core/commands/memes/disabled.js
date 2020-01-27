const { resolve } = require('path');
const Jimp = require('jimp');

module.exports = {
  name: 'disabled',
  aliases: [],
  description: '',
  usage: '<user>',
  category: 'memes',
  requirements: { botPermissions: ['EMBED_LINKS', 'ATTACH_FILES'] },
  cooldown: 10,
  async execute(client, message, params) {
    try {
      message.channel.startTyping();
      const avatarURL = message.mentions.users.size ? message.mentions.users.first().displayAvatarURL : message.author.displayAvatarURL;
      const disabled = await Jimp.read(resolve(__dirname, '..', '..', 'assets', 'jpg', 'disabled.jpg'));
      const avatar = await Jimp.read(avatarURL);
      avatar.resize(157, 157);
      disabled.composite(avatar, 390, 252);
      await message.channel.send({ files: [{ attachment: await disabled.getBufferAsync(Jimp.MIME_JPEG), name: 'disabled.jpg' }] }).then(message.channel.stopTyping());
    } catch (error) {
      message.channel.send(new client.RichEmbed()
        .setColor(client.utils.hexColor('ERROR'))
        .setDescription(`:x: : Oops, **${error.message}**`)
      ).then(message.channel.stopTyping());
    }
  }
};
