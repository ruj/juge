const { RandomRedditPost } = require('../../');

module.exports = {
  name: 'monstergirl',
  aliases: ['mgirl', 'mg'],
  permissions: ['EMBED_LINKS'],
  permissionLevel: 0,
  description: 'Monster girls picture',
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
