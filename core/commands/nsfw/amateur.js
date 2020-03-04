const { RandomRedditPost } = require('../../');

module.exports = {
  name: 'amateur',
  aliases: [],
  description: 'Amateur content',
  category: 'nsfw',
  requirements: { nsfwOnly: true, botPermissions: ['EMBED_LINKS'] },
  async execute(client, message) {
    await RandomRedditPost(client, message, this);
  }
};
