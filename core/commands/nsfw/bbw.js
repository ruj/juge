const { RandomRedditPost } = require('../../');

module.exports = {
  name: 'bbw',
  aliases: [],
  description: 'Big Beautiful Woman',
  category: 'nsfw',
  requirements: { nsfwOnly: true, botPermissions: ['EMBED_LINKS'] },
  async execute(client, message) {
    await RandomRedditPost(client, message, this);
  }
};
