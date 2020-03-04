const { RandomRedditPost } = require('../../');

module.exports = {
  name: 'futa',
  aliases: ['futanari'],
  description: 'Images of hermaphrodites, perhaps',
  category: 'nsfw',
  requirements: { nsfwOnly: true, botPermissions: ['EMBED_LINKS'] },
  async execute(client, message) {
    await RandomRedditPost(client, message, this);
  }
};
