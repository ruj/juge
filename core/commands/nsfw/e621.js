const { RandomBooruPost } = require('../../');

module.exports = {
  name: 'e621',
  aliases: ['e6'],
  description: 'Searches for images on e621.net',
  usage: '[search query]',
  category: 'nsfw',
  requirements: { nsfwOnly: true, parameters: true, botPermissions: ['EMBED_LINKS'] },
  cooldown: 10,
  async execute(client, message, params) {
    await RandomBooruPost(client, message, params, this);
  }
};
