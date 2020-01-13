const { RandomRedditPost } = require('../../');

module.exports = {
  name: 'lingerie',
  aliases: ['stockings'],
  description: 'Girls with lingerie',
  category: 'nsfw',
  requirements: { nsfwOnly: true, botPermissions: ['EMBED_LINKS'] },
  async execute(client, message, params) {
    await RandomRedditPost(client, message, this);
  }
};
