const Booru = require('booru');
const boorus = require('../../assets/json/booru_sites.json');

const IGNORE_WORDS = ['loli', 'shota', 'cub', 'young', 'child', 'baby', 'guro', 'gore', 'vore', 'scat'];

module.exports = async (client, { content, channel, guild: { me }, parameters }, { name }) => {
  if (!new RegExp(IGNORE_WORDS.join('|')).test(content.toLowerCase())) {
    try {
      const posts = await Booru.search(boorus[name], [ parameters.join('_') ], { random: true });

      if (posts.length) {
        channel.send(new client.MessageEmbed()
          .setColor(client.utils.hexColor(me))
          .setImage(posts[0].fileUrl)
        )
      } else {
        throw new Error('No results found');
      }
    } catch (error) {
      channel.send(new client.MessageEmbed()
        .setColor(client.utils.hexColor('ERROR'))
        .setDescription(`:x: : Oops, **${error.message}**`)
      );
    }
  } else {
    channel.send(new client.MessageEmbed()
      .setColor(client.utils.hexColor('WARNING'))
      .setDescription(':warning: : I can not send it here, not even on NSFW channels.')
    );
  }
};