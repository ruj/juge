const Neko = require('../../apis/NekosDotLife.js');

module.exports = async (client, message, { name }) => {
  const { url } = await Neko.image(name);

  message.channel.send(new client.RichEmbed()
    .setColor(client.util.hexColor(message))
    .setImage(url)
  );
};