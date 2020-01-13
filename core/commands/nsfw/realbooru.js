const { RandomBooruPost } = require('../../');

module.exports = {
  name: 'realbooru',
  aliases: ['rb'],
  description: 'Searches for images on realbooru.com',
  usage: '[search query]',
  category: 'nsfw',
  requirements: { nsfwOnly: true, parameters: true, botPermissions: ['EMBED_LINKS'] },
  cooldown: 10,
  async execute(client, message, params) {
    await RandomBooruPost(client, message, params, this);
  }
};
