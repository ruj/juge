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

    if (message.parameters.length < 2) {
      /* [TODO: Flag that there are not enough parameters] */
      return;
    } else {
      const target = await client.users.fetch(user);

      if (option && option.toUpperCase() === 'ADD') {
        /* [TODO: Flag that a reason was not received] */
        if (!reason) return;

        const userExists = await UserRepository.findOne(target.id);

        if (!userExists) {
          const userAdded = await UserRepository.add(target);

          UserRepository.update(userAdded._id, {
            $set: {
              blacklisted: {
                reason,
                blacklister: message.author.id
              }
            }
          })
          .then(() => {
            message.channel.send(new client.MessageEmbed()
              .setColor(client.utils.hexColor(message))
              .setDescription(`User **${userAdded._id}** was blacklisted.`)
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
            .setDescription(`:warning: : User **${userExists._id}** is already blacklisted.`)
          );
        }
      } else if (option && option.toUpperCase() === 'REMOVE') {
        const userExists = await UserRepository.findOne(target.id);

        if (userExists) {
          UserRepository.remove(userExists._id)
            .then(() => {
              message.channel.send(new client.MessageEmbed()
                .setColor(client.utils.hexColor(message))
                .setDescription(`User **${userExists._id}** has been unblacklisted.`)
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
            .setDescription(`:warning: : User **${target.id}** is not blacklisted.`)
          );
        }
      }
    }
  }
};