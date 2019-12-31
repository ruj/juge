const { RandomRedditPost } = require('../../');

module.exports = {
  name: 'feet',
  aliases: ['foot'],
  permissions: ['EMBED_LINKS'],
  permissionLevel: 0,
  description: 'Beautiful images of feet',
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
