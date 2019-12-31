const { RandomRedditPost } = require('../../');

module.exports = {
  name: 'futa',
  aliases: ['futanari'],
  permissions: ['EMBED_LINKS'],
  permissionLevel: 0,
  description: 'Images of hermaphrodites, perhaps',
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
