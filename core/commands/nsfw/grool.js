const { RandomRedditPost } = require('../../');

module.exports = {
  name: 'grool',
  aliases: [],
  description: 'Girls drooling',
  category: 'nsfw',
  requirements: { nsfwOnly: true, botPermissions: ['EMBED_LINKS'] },
  async execute(client, message) {
    await RandomRedditPost(client, message, this);
  }
};
