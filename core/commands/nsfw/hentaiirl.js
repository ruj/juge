const { RandomRedditPost } = require('../../');

module.exports = {
  name: 'hentaiirl',
  aliases: ['hirl'],
  permissions: ['EMBED_LINKS'],
  permissionLevel: 0,
  description: 'Hentai! But depicts of real situations',
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
