const { RandomRedditPost } = require('../../');

module.exports = {
  name: 'public',
  aliases: [],
  description: 'Public exhibition photos',
  category: 'nsfw',
  requirements: { nsfwOnly: true, botPermissions: ['EMBED_LINKS'] },
  async execute(client, message, params) {
    await RandomRedditPost(client, message, this);
  }
};
