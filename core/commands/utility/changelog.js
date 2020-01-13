const GitHub = require('../../apis/GitHub.js');
const { JUGE_REPO_USERNAME, JUGE_REPO_NAME } = process.env;

module.exports = {
  name: 'changelog',
  aliases: ['updates', 'commits'],
  description: 'Latest commits to bot repository',
  category: 'utility',
  requirements: { botPermissions: ['EMBED_LINKS'] },
  cooldown: 60,
  async execute(client, message, params) {
    const commits = (await GitHub.getRepository(JUGE_REPO_USERNAME, JUGE_REPO_NAME, 'commits')).slice(0, 10);

    const embed = new client.RichEmbed()
      .setColor(client.util.hexColor(message))
      .setTitle(`${JUGE_REPO_NAME}:master`)
      .setURL(`https://github.com/${JUGE_REPO_USERNAME}/${JUGE_REPO_NAME}/commits/master`)

      commits.map(({ sha, commit, html_url, committer }) => embed.addField(sha.slice(0, 7), [
        `[\`${commit.message}\`](${html_url}) (${client.util.days(commit.committer.date, { extended: false }) > 1 ? `${client.util.days(commit.committer.date)} ago` : 'Today'})`,
        `**Committer**: [${committer.login}](${committer.html_url})`
      ].join('\n')));

    message.channel.send(embed);
  }
};
