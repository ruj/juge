const { UserRepository } = require('../../database/repositories');
const { DiscordUtils } = require('../../');

module.exports = {
  name: 'whyblacklisted',
  aliases: [],
  description: 'Check reason why is blacklisted',
  usage: '<user>',
  category: 'utility',
  cooldown: 30,
  async execute(client, message) {
    const target = await client.users.fetch(DiscordUtils.resolveUser(message));
    const user = await UserRepository.findOne(target.id);

    message.channel.send(user && user.blacklisted ? `User **${user._id}** Blacklist Reason: \`${user.blacklisted.reason}\`` : `User **${target.id}** is not blacklisted`);
  }
};