const { RandomRedditPost } = require('../../');

module.exports = {
  name: 'hentaiirl',
  aliases: ['hirl'],
  description: 'Hentai! But depicts of real situations',
  category: 'nsfw',
  requirements: { nsfwOnly: true, botPermissions: ['EMBED_LINKS'] },
  async execute(client, message, params) {
    await RandomRedditPost(client, message, this);
  }
};
