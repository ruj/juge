const { RandomRedditPost } = require('../../');

module.exports = {
  name: 'bdsm',
  aliases: [],
  description: '',
  category: 'nsfw',
  requirements: { nsfwOnly: true, botPermissions: ['EMBED_LINKS'] },
  async execute(client, message) {
    await RandomRedditPost(client, message, this);
  }
};
