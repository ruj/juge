const { RandomRedditPost } = require('../../');

module.exports = {
  name: 'ahegao',
  aliases: [],
  description: 'Images of faces expressing pleasure',
  category: 'nsfw',
  requirements: { nsfwOnly: true, botPermissions: ['EMBED_LINKS'] },
  async execute(client, message, params) {
    await RandomRedditPost(client, message, this);
  }
};
