const Booru = require('booru');

module.exports = async (client, message, params, { name }) => {
  const { channel } = message;
  if (!message.content.toUpperCase().includes('LOLI', 'GORE')) {
    try {
      const posts = await Booru.search(name, [ params.join('_') ], { limit: 1, random: true });

      if (posts.length) {
        channel.send(new client.RichEmbed()
          .setColor(client.util.hexColor(message))
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