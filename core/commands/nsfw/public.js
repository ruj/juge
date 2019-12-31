const { RandomRedditPost } = require('../../');

module.exports = {
  name: 'public',
  aliases: [],
  permissions: ['EMBED_LINKS'],
  permissionLevel: 0,
  description: 'Public exhibition photos',
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
