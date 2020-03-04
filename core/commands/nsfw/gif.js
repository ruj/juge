const { RandomRedditPost } = require('../../');

module.exports = {
  name: 'gif',
  aliases: ['gifnsfw', 'gnsfw'],
  description: 'Porn gifs',
  category: 'nsfw',
  requirements: { nsfwOnly: true, botPermissions: ['EMBED_LINKS'] },
  async execute(client, message) {
    await RandomRedditPost(client, message, this);
  }
};
