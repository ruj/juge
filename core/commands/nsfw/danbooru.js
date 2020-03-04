const { RandomBooruPost } = require('../../');

module.exports = {
  name: 'danbooru',
  aliases: ['db', 'dan', 'danbooru'],
  description: 'Searches for images on danbooru.donmai.us',
  usage: '[search query]',
  category: 'nsfw',
  requirements: { nsfwOnly: true, parameters: true, botPermissions: ['EMBED_LINKS'] },
  cooldown: 10,
  async execute(client, message) {
    await RandomBooruPost(client, message, this);
  }
};
