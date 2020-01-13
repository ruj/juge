const { RandomRedditPost } = require('../../');

module.exports = {
  name: 'petite',
  aliases: ['tiny', 'teen'],
  description: 'Juicy teens',
  category: 'nsfw',
  requirements: { nsfwOnly: true, botPermissions: ['EMBED_LINKS'] },
  async execute(client, message, params) {
    await RandomRedditPost(client, message, this);
  }
};
