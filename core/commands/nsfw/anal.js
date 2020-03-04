const { RandomNekoBotImage } = require('../../');

module.exports = {
  name: 'anal',
  aliases: ['bumfun'],
  description: 'Anus images',
  category: 'nsfw',
  requirements: { nsfwOnly: true, botPermissions: ['EMBED_LINKS'] },
  async execute(client, message) {
    await RandomNekoBotImage(client, message, this);
  }
};
