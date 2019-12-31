const { RandomRedditPost } = require('../../');

module.exports = {
  name: 'bondage',
  aliases: [],
  permissions: ['EMBED_LINKS'],
  permissionLevel: 0,
  description: '',
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
