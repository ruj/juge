const { RandomRedditPost } = require('../../');

module.exports = {
  name: 'petite',
  aliases: ['tiny', 'teen'],
  permissions: ['EMBED_LINKS'],
  permissionLevel: 0,
  description: 'Juicy teens',
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
