const { RandomRedditPost } = require('../../');

module.exports = {
  name: 'hentaigif',
  aliases: ['hgif'],
  description: 'Perverted gifs',
  category: 'nsfw',
  requirements: { nsfwOnly: true, botPermissions: ['EMBED_LINKS'] },
  async execute(client, message) {
    await RandomRedditPost(client, message, this);
  }
};
