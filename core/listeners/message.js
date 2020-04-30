const _ = require('lodash');

module.exports = async (client, message) => {
	if (!message.author.bot && message.channel.type !== 'dm') {
		try {
			const guild = await client.database.guilds.findOne(message.guild.id);

			if (guild !== null) {
				let prefixes = client.config.prefixes.concat(guild.prefix);

				Array(`<@${client.user.id}>`, `<@!${client.user.id}>`).find((mention) => {
					if (message.content.startsWith(mention)) {
						const embed = new client.MessageEmbed()
							.setColor(client.utils.hexColor(message))
							.addField(':globe_with_meridians: Global prefixes', client.utils.sendCode(`${prefixes.slice(0, -1).join(' or ')}`, { code: 'fix' }))
							.addField(':house: Server prefix', client.utils.sendCode(guild.prefix ? guild.prefix : 'Not yet defined', { code: 'fix' }))

              if (new Date(guild.createdAt).getTime() !== new Date(guild.updatedAt).getTime()) embed.setFooter(`Updated ${client.utils.days(guild.updatedAt, { extended: false }) > 0 ? `${client.utils.days(guild.updatedAt)} ago` : 'today'}`);
            message.channel.send(embed);
					}
				});

        const prefix = prefixes.reduce((accumulator, current) => message.content.includes(current) && current || accumulator, null);

        if (message.content.startsWith(prefix)) {
          const parameters = message.content.slice(prefix.length).split(/ +/);
          const commandName = parameters.shift().toLowerCase();
          let command = client.commands.get(commandName) || client.commands.find((command) => command.aliases && command.aliases.includes(commandName));

          if (!command) return;

          const user = await client.database.users.findOne(message.author.id);
          if (user && user.blacklisted && commandName !== 'whyblacklisted') return message.react(client.getEmoji('YOU_ARE_BLACKLISTED', false));

          message.parameters = parameters;
          command.requirements = _.defaults(command.requirements, {
              devOnly: false,
              nsfwOnly: false,
              parameters: false,
              botPermissions: [],
              permissions: [],
              typing: false
          });

          if (command.requirements.devOnly && message.author.id !== client.config.ownerID) return;

          if (command.requirements.nsfwOnly && !message.channel.nsfw) {
            return message.channel.send(new client.MessageEmbed()
              .setColor(client.utils.hexColor('ERROR'))
              .setTitle('NSFW Command')
              .setDescription('Please switch to NSFW channel in order to use this command.')
              .setImage('https://a.kyouko.se/m3cN.jpg')
            );
          }

          if (command.requirements.parameters && !parameters.length) {
            return message.reply('you did not provide any parameters.')
              .then(() => {
                if (command.usage) {
                  message.channel.send(new client.MessageEmbed()
                    .setColor(client.utils.hexColor(message))
                    .addField(':page_facing_up: Usage', client.utils.sendCode(`${prefix}${command.name} ${command.usage}`, { code: 'fix' }))
                  );
                }
              });
          }

          if (command.requirements.botPermissions) {
            if (!message.guild.me.permissions.toArray().includes(command.requirements.botPermissions)) {
              const reqPermissions = client.utils.difference(command.requirements.botPermissions, message.guild.me.permissions.toArray());
              if (reqPermissions.length) return message.reply(`for this command to work I need the following permissions: \`${reqPermissions.join('\`, \`')}\`.`);
            }
          }

          if (command.requirements.permissions) {
            if (!message.member.permissions.toArray().includes(command.requirements.permissions)) {
              const reqPermissions = client.utils.difference(command.requirements.permissions, message.member.permissions.toArray());
              if (reqPermissions.length) return message.reply(`to use this command, you need the following permissions: \`${reqPermissions.join('\`, \`')}\`.`);
            }
          }

          if (!client.cooldowns.has(command.name)) {
            client.cooldowns.set(command.name, new (require('discord.js')).Collection());
          }

          const now = Date.now();
          const timestamps = client.cooldowns.get(command.name);
          const cooldownAmount = (command.cooldown ? command.cooldown : 5) * 1E3;

          if (timestamps.has(message.author.id)) {
            const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
            if (now < expirationTime) {
              const timeLeft = ((expirationTime - now) / 1E3).toFixed(1);
              return message.reply(`please wait \`${timeLeft}\` more second(s).`).then((_message) => _message.delete({ timeout: timeLeft * 1E3 }));
            }
          }

          timestamps.set(message.author.id, now);
          setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

          try {
            if (process.env.NODE_ENV) {
              const commandExists = await client.database.commands.findOne(command.name);

              await commandExists
                ? client.database.commands.update(command.name, { $inc: { count: 1 } })
                : client.database.commands.add(command);
            }

            if (command.requirements.typing) message.channel.startTyping();

            Promise.resolve(command.execute(client, message))
              .then(() => {
                if (command.requirements.typing) message.channel.stopTyping();
              });
          } catch (error) {
            client.log(error.message, { tags: ['execute'], color: 'red' });
          }
        }
			} else if (guild === null) {
				const addGuild = await client.database.guilds.add(message.guild);
				message.channel.send(new client.MessageEmbed()
          .setColor(client.utils.hexColor('WARNING'))
          .setDescription(':warning: : I noticed that the server information is not in my records, I am correcting now, try again later.')
        );
			}
		} catch (error) {
			client.log(error.message, { tags: ['message'], color: 'red' });
      console.log(error);
		}
	}
};