const { RandomRedditPost } = require('../../');

module.exports = {
  name: 'bondage',
  aliases: [],
  description: '',
  category: 'nsfw',
  requirements: { nsfwOnly: true, botPermissions: ['EMBED_LINKS'] },
  async execute(client, message) {
    await RandomRedditPost(client, message, this);
  }
};
