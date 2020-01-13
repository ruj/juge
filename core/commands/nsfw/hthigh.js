const { RandomNekoBotImage } = require('../../');

module.exports = {
  name: 'hthigh',
  aliases: [],
  description: 'Hentai with beautiful thighs',
  category: 'nsfw',
  requirements: { nsfwOnly: true, botPermissions: ['EMBED_LINKS'] },
  async execute(client, message, params) {
    await RandomNekoBotImage(client, message, this);
  }
};
