const { RandomRedditPost } = require('../../');

module.exports = {
  name: 'monstergirl',
  aliases: ['mgirl', 'mg'],
  description: 'Monster girls picture',
  category: 'nsfw',
  requirements: { nsfwOnly: true, botPermissions: ['EMBED_LINKS'] },
  async execute(client, message) {
    await RandomRedditPost(client, message, this);
  }
};
