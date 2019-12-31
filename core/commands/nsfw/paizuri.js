const { RandomRedditPost } = require('../../');

module.exports = {
  name: 'paizuri',
  aliases: ['katakana'],
  permissions: ['EMBED_LINKS'],
  permissionLevel: 0,
  description: 'Stimulate in the breasts of girls',
  usage: '',
  category: 'nsfw',
  guildOnly: false,
  params: false,
  cooldown: 5,
  enabled: true,
  async execute(client, message, params) {
    await RandomRedditPost(client, message, this);
  }
};
