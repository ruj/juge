const Reddit = require('../../utils/Reddit.js');
const subreddits = require('../../assets/json/subreddits.json');

module.exports = async (client, { channel, guild: { me } }, { name }) => {
    const { url } = await Reddit(subreddits[name]);

    channel.send(new client.RichEmbed()
      .setColor(client.utils.hexColor(me))
      .setImage(url)
    );
};