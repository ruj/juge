const { RandomRedditPost } = require('../../');

module.exports = {
  name: 'asian',
  aliases: [],
  description: 'Asian images',
  category: 'nsfw',
  requirements: { nsfwOnly: true, botPermissions: ['EMBED_LINKS'] },
  async execute(client, message, params) {
    await RandomRedditPost(client, message, this);
  }
};
