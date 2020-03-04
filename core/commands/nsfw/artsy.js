const { RandomRedditPost } = require('../../');

module.exports = {
  name: 'artsy',
  aliases: ['artsyporn'],
  description: 'Not pornographic but artistic',
  category: 'nsfw',
  requirements: { nsfwOnly: true, botPermissions: ['EMBED_LINKS'] },
  async execute(client, message) {
    await RandomRedditPost(client, message, this);
  }
};
