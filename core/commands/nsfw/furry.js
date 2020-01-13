const { RandomBooruPost } = require('../../');

module.exports = {
  name: 'furry',
  aliases: ['fb', 'furrybooru'],
  description: 'Searches for images on furry.booru.org',
  usage: '[search query]',
  category: 'nsfw',
  requirements: { nsfwOnly: true, parameters: true, botPermissions: ['EMBED_LINKS'] },
  cooldown: 10,
  async execute(client, message, params) {
    await RandomBooruPost(client, message, params, this);
  }
};
