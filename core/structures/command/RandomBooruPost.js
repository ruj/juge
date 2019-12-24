const Booru = require('booru');
const boorus = require('../../assets/json/booru_sites.json');

module.exports = async (client, { content, channel, guild: { me } }, params, { name }) => {
  if (!content.toUpperCase().includes('LOLI', 'GORE')) {
    try {
      const posts = await Booru.search(boorus[name], [ params.join('_') ], { random: true });

      if (posts.length) {
        channel.send(new client.RichEmbed()
          .setColor(client.util.hexColor(me))
          .setImage(posts[0].fileUrl)
        )
      } else {
        throw new Error('No results found');
      }
    } catch (error) {
      channel.send(new client.RichEmbed()
        .setColor(client.util.hexColor('ERROR'))
        .setDescription(`:x: : Oops, **${error.message}**`)
      );
    }
  } else {
    channel.send(new client.RichEmbed()
      .setColor(client.util.hexColor('WARNING'))
      .setDescription(':warning: : I can not send it here, not even on NSFW channels.')
    );
  }
};