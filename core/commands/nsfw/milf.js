const { RandomRedditPost } = require('../../');

module.exports = {
  name: 'milf',
  aliases: [],
  description: 'Mommys with everything on top',
  category: 'nsfw',
  requirements: { nsfwOnly: true, botPermissions: ['EMBED_LINKS'] },
  async execute(client, message) {
    await RandomRedditPost(client, message, this);
  }
};
