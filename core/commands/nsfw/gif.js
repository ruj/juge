const { RandomRedditPost } = require('../../');

module.exports = {
  name: 'gif',
  aliases: ['gifnsfw', 'gnsfw'],
  permissions: ['EMBED_LINKS'],
  permissionLevel: 0,
  description: 'Porn gifs',
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
