const { RandomRedditPost } = require('../../');

module.exports = {
  name: 'cosplay',
  aliases: ['cos'],
  description: 'Adult cosplays',
  category: 'nsfw',
  requirements: { nsfwOnly: true, botPermissions: ['EMBED_LINKS'] },
  async execute(client, message) {
    await RandomRedditPost(client, message, this);
  }
};
