const { RandomRedditPost } = require('../../');

module.exports = {
  name: 'feet',
  aliases: ['foot'],
  description: 'Beautiful images of feet',
  category: 'nsfw',
  requirements: { nsfwOnly: true, botPermissions: ['EMBED_LINKS'] },
  async execute(client, message) {
    await RandomRedditPost(client, message, this);
  }
};
