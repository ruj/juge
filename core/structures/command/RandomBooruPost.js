const Booru = require('booru');
const boorus = require('../../assets/json/booru_sites.json');

const ignoreWords = ['LOLI', 'GORE'];

module.exports = async (client, { content, channel, guild: { me }, parameters }, { name }) => {
  if (!new RegExp(ignoreWords.join('|')).test(content.toUpperCase())) {
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