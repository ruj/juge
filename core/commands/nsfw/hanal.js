const { RandomNekoBotImage } = require('../../');

module.exports = {
  name: 'hanal',
  aliases: [],
  permissions: ['EMBED_LINKS'],
  permissionLevel: 0,
  description: 'Anus of anime girls',
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
