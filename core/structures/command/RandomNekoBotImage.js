const Neko = require('../../apis/NekoBot.js');

module.exports = async (client, { channel, guild: { me } }, { name }) => {
  const { message: url } = await Neko.image(name);

  channel.send(new client.RichEmbed()
    .setColor(client.util.hexColor(me))
    .setImage(url)
  );
};