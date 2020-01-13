const { RandomBooruPost } = require('../../');

module.exports = {
  name: 'derpibooru',
  aliases: ['dp', 'derp', 'derpi'],
  description: 'Searches for images on derpibooru.org',
  usage: '[search query]',
  category: 'nsfw',
  requirements: { nsfwOnly: true, parameters: true, botPermissions: ['EMBED_LINKS'] },
  cooldown: 10,
  async execute(client, message, params) {
    await RandomBooruPost(client, message, params, this);
  }
};
