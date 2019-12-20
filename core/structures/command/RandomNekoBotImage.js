const Neko = require('../../apis/NekoBot.js');

module.exports = async (client, message, { name }) => {
  const { message: url } = await Neko.image(name);

  message.channel.send(new client.RichEmbed()
    .setColor(client.util.hexColor(message))
    .setImage(url)
  );
};