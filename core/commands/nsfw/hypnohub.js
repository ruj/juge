const { RandomBooruPost } = require('../../');

module.exports = {
  name: 'hypnohub',
  aliases: ['hh', 'hypo', 'hypno', 'hypohub'],
  permissions: ['EMBED_LINKS'],
  permissionLevel: 0,
  description: 'Searches for images on hypnohub.net',
  usage: '[search query]',
  category: 'nsfw',
  guildOnly: false,
  params: true,
  cooldown: 10,
  enabled: true,
  async execute(client, message, params) {
    await RandomBooruPost(client, message, params, this);
  }
};
