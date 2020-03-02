const Neko = require('../../apis/NekoBot.js');

module.exports = async (client, { channel, guild: { me } }, { name }) => {
  const { message: url } = await Neko.image(name);

  channel.send(new client.MessageEmbed()
    .setColor(client.utils.hexColor(me))
    .setImage(url)
  );
};