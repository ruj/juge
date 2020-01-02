const fetch = require('node-fetch');
const { CryptoUtil: { base64 } } = require('../../');
const {
  GITHUB_USERNAME,
  GITHUB_PASSWORD,
  JUGE_REPO_USERNAME,
  JUGE_REPO_NAME
} = process.env;

module.exports = {
  name: 'changelog',
  aliases: ['updates', 'commits'],
  permissions: ['EMBED_LINKS'],
  permissionLevel: 0,
  description: 'Latest commits to bot repository',
  usage: '',
  category: 'utility',
  guildOnly: false,
  params: false,
  cooldown: 60,
  enabled: true,
  async execute(client, message, params) {
    const response = await fetch(`https://api.github.com/repos/${JUGE_REPO_USERNAME}/${JUGE_REPO_NAME}/commits`, {
      Authorization: `Basic ${base64(`${GITHUB_USERNAME}:${GITHUB_PASSWORD}`)}`
    });
    const body = await response.json();
    const commits = body.slice(0, 10);

    const embed = new client.RichEmbed()
      .setColor(client.util.hexColor(message))
      .setTitle(`${JUGE_REPO_NAME}:master`)
      .setURL(`https://github.com/${JUGE_REPO_USERNAME}/${JUGE_REPO_NAME}/commits/master`)

      commits.map(({ sha, commit, html_url, committer }) => embed.addField(sha.slice(0, 7), [
        `[\`${commit.message}\`](${html_url}) (${client.util.days(commit.committer.date, { extended: false }) > 1 ? `${client.util.days(commit.committer.date)} ago` : 'Today'})`,
        `**Committer**: [${committer.login}](https://github.com/${committer.html_url})`
      ].join('\n')));

    message.channel.send(embed);
  }
};
