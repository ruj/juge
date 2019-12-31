const { RandomRedditPost } = require('../../');

module.exports = {
  name: 'cosplay',
  aliases: ['cos'],
  permissions: ['EMBED_LINKS'],
  permissionLevel: 0,
  description: 'Adult cosplays',
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
