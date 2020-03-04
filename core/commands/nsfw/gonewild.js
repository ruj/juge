const { RandomNekoBotImage } = require('../../');

module.exports = {
  name: 'gonewild',
  aliases: [],
  description: '',
  category: 'nsfw',
  requirements: { nsfwOnly: true, botPermissions: ['EMBED_LINKS'] },
  async execute(client, message) {
    await RandomNekoBotImage(client, message, this);
  }
};
