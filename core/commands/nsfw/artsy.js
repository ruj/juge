const { RandomRedditPost } = require('../../');

module.exports = {
  name: 'artsy',
  aliases: ['artsyporn'],
  permissions: ['EMBED_LINKS'],
  permissionLevel: 0,
  description: 'Not pornographic but artistic',
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
