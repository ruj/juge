const { RandomNekoBotImage } = require('../../');

module.exports = {
  name: 'anal',
  aliases: ['bumfun'],
  permissions: ['EMBED_LINKS'],
  permissionLevel: 0,
  description: 'Anus images',
  usage: '',
  category: 'nsfw',
  guildOnly: false,
  params: false,
  cooldown: 5,
  enabled: true,
  async execute(client, message, params) {
    await RandomNekoBotImage(client, message, this);
  }
};
