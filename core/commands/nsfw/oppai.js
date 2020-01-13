const { RandomRedditPost } = require('../../');

module.exports = {
  name: 'oppai',
  aliases: [],
  description: 'Big and beautiful breasts',
  category: 'nsfw',
  requirements: { nsfwOnly: true, botPermissions: ['EMBED_LINKS'] },
  async execute(client, message, params) {
    await RandomRedditPost(client, message, this);
  }
};
