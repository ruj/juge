const { RandomBooruPost } = require('../../');

module.exports = {
  name: 'yandere',
  aliases: ['yd', 'yand'],
  description: 'Searches for images on yande.re',
  usage: '[search query]',
  category: 'nsfw',
  requirements: { nsfwOnly: true, parameters: true, botPermissions: ['EMBED_LINKS'] },
  cooldown: 10,
  async execute(client, message) {
    await RandomBooruPost(client, message, this);
  }
};
