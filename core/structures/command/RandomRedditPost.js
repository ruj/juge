const Reddit = require('../../util/Reddit.js');
const subreddits = require('../../assets/json/subreddits.json');

module.exports = async (client, message, { name }) => {
    const { url } = await Reddit(subreddits[name]);

    return message.channel.send(new client.RichEmbed()
      .setColor(client.util.hexColor(message))
      .setImage(url)
    );
};