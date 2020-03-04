const { RandomBooruPost } = require('../../');

module.exports = {
  name: 'gelbooru',
  aliases: ['gb', 'gel'],
  description: 'Searches for images on gelbooru.com',
  usage: '[search query]',
  category: 'nsfw',
  requirements: { nsfwOnly: true, parameters: true, botPermissions: ['EMBED_LINKS'] },
  cooldown: 10,
  async execute(client, message) {
    await RandomBooruPost(client, message, this);
  }
};
