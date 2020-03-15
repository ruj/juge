const { UserRepository } = require('../../database/repositories');

module.exports = {
  name: 'blacklist',
  aliases: ['bl'],
  description: '',
  usage: '[add|remove] [user] [reason]',
  category: 'developer',
  requirements: { devOnly: true, botPermissions: ['EMBED_LINKS'] },
  cooldown: 30,
  async execute(client, message) {
    const [option, user] = message.parameters;
    const reason = message.parameters.slice(2).join(' ');
    const prefixUsed = message.content.replace(/(blacklist|bl).*/g, '');

    if (message.parameters.length < 2) {
      message.channel.send(new client.MessageEmbed()
        .setColor(client.utils.hexColor(message))
        .addField(':page_facing_up: Usage', client.utils.sendCode(`${prefixUsed}${this.name} ${option.toLowerCase()} [user]${option.toUpperCase() === 'ADD' ? ' [reason]' : ''}`, { code: 'fix' }))
      );
    } else {
      const target = await client.users.fetch(user);

      if (option && option.toUpperCase() === 'ADD') {
        if (!reason) {
          return message.channel.send(new client.MessageEmbed()
            .setColor(client.utils.hexColor(message))
            .addField(':page_facing_up: Usage', client.utils.sendCode(`${prefixUsed}${this.name} ${option.toLowerCase()} ${target.id} [reason]`, { code: 'fix' }))
          );
        }

        const user = await UserRepository.get({ _id: target.id });

        if (user && !user.blacklisted) {
          UserRepository.update(user._id, {
            blacklisted: {
              reason,
              blacklister: message.author.id
            }
          })
          .then(() => {
            message.channel.send(new client.MessageEmbed()
              .setColor(client.utils.hexColor(message))
              .setDescription(`${client.getEmoji('YOU_ARE_BLACKLISTED')} User **${user._id}** was blacklisted.`)
            );
          })
          .catch((error) => {
            message.channel.send(new client.MessageEmbed()
              .setColor(client.utils.hexColor('ERROR'))
              .setDescription(`:x: : Oops, **${error.message}**`)
            );
          });
        } else {
          message.channel.send(new client.MessageEmbed()
            .setColor(client.utils.hexColor('WARNING'))
            .setDescription(`:warning: : User **${user._id}** is already blacklisted.`)
          );
        }
      } else if (option && option.toUpperCase() === 'REMOVE') {
        const user = await UserRepository.findOne(target.id);

        if (user && user.blacklisted) {
          UserRepository.update(user._id, { blacklisted: null })
            .then(() => {
              message.channel.send(new client.MessageEmbed()
                .setColor(client.utils.hexColor(message))
                .setDescription(`:pencil: User **${user._id}** has been unblacklisted.`)
              );
            })
            .catch((error) => {
              message.channel.send(new client.MessageEmbed()
                .setColor(client.utils.hexColor('ERROR'))
                .setDescription(`:x: : Oops, **${error.message}**`)
              );
            });
        } else {
          message.channel.send(new client.MessageEmbed()
            .setColor(client.utils.hexColor('WARNING'))
            .setDescription(`:warning: : User **${user._id}** is not blacklisted.`)
          );
        }
      }
    }
  }
};