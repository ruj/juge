const { RandomRedditPost } = require('../../');

module.exports = {
  name: 'paizuri',
  aliases: ['katakana'],
  description: 'Stimulate in the breasts of girls',
  category: 'nsfw',
  requirements: { nsfwOnly: true, botPermissions: ['EMBED_LINKS'] },
  async execute(client, message) {
    await RandomRedditPost(client, message, this);
  }
};
