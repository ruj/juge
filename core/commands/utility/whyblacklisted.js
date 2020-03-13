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
    const userExists = await UserRepository.findOne(target.id);

    message.channel.send(userExists ? `User **${userExists._id}** Blacklist Reason: \`${userExists.blacklisted.reason}\`` : `User **${target.id}** is not blacklisted`);
  }
};