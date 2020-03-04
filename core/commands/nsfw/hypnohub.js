const { RandomBooruPost } = require('../../');

module.exports = {
  name: 'hypnohub',
  aliases: ['hh', 'hypo', 'hypno', 'hypohub'],
  description: 'Searches for images on hypnohub.net',
  usage: '[search query]',
  category: 'nsfw',
  requirements: { nsfwOnly: true, parameters: true, botPermissions: ['EMBED_LINKS'] },
  cooldown: 10,
  async execute(client, message) {
    await RandomBooruPost(client, message, this);
  }
};
