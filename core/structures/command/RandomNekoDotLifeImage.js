const Neko = require('../../apis/NekosDotLife.js');

module.exports = async (client, { channel, guild: { me } }, { name }) => {
  const { url } = await Neko.image(name);

  channel.send(new client.MessageEmbed()
    .setColor(client.utils.hexColor(me))
    .setImage(url)
  );
};