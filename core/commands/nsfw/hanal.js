const { RandomNekoBotImage } = require('../../');

module.exports = {
  name: 'hanal',
  aliases: [],
  description: 'Anus of anime girls',
  category: 'nsfw',
  requirements: { nsfwOnly: true, botPermissions: ['EMBED_LINKS'] },
  async execute(client, message, params) {
    await RandomNekoBotImage(client, message, this);
  }
};
