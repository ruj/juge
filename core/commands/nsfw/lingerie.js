const { RandomRedditPost } = require('../../');

module.exports = {
  name: 'lingerie',
  aliases: ['stockings'],
  permissions: ['EMBED_LINKS'],
  permissionLevel: 0,
  description: 'Girls with lingerie',
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
