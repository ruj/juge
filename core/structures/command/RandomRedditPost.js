const Reddit = require('../../util/Reddit.js');
const subreddits = require('../../assets/json/subreddits.json');

module.exports = async (client, { channel, guild: { me } }, { name }) => {
    const { url } = await Reddit(subreddits[name]);

    channel.send(new client.RichEmbed()
      .setColor(client.util.hexColor(me))
      .setImage(url)
    );
};