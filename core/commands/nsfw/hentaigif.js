const { RandomRedditPost } = require('../../');

module.exports = {
  name: 'hentaigif',
  aliases: ['hgif'],
  permissions: ['EMBED_LINKS'],
  permissionLevel: 0,
  description: 'Perverted gifs',
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
