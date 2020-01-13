const { RandomNekoBotImage } = require('../../');

module.exports = {
  name: 'hass',
  aliases: [],
  description: 'Hentai buttocks',
  category: 'nsfw',
  requirements: { nsfwOnly: true, botPermissions: ['EMBED_LINKS'] },
  async execute(client, message, params) {
    await RandomNekoBotImage(client, message, this);
  }
};
