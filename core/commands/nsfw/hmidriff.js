const { RandomNekoBotImage } = require('../../');

module.exports = {
  name: 'hmidriff',
  aliases: [],
  description: 'Girls and their bellies',
  category: 'nsfw',
  requirements: { nsfwOnly: true, botPermissions: ['EMBED_LINKS'] },
  async execute(client, message, params) {
    await RandomNekoBotImage(client, message, this);
  }
};
