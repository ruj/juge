const { CommandController, GuildController } = require('../database/controllers');

module.exports = async (client, message) => {
	client.elevation = (message) => {
		let level = 0;

		if (message.member.permissions.has('MANAGE_CHANNELS')) level = 5;
		if (message.member.permissions.has('MANAGE_GUILD')) level = 6;
		if (message.member.permissions.has('ADMINISTRATOR')) level = 7;

		if (message.author.id === client.config.ownerID) level = 9;

		return level;
	};

	if (message.channel.type !== 'dm') {
		try {
			const guild = await GuildController.findOne(message.guild);

			if (guild !== null) {
				let prefixes = client.config.prefixes.concat(guild.prefix);

				Array(`<@${client.user.id}>`, `<@!${client.user.id}>`).find((client) => {
					if (message.content.startsWith(client)) {
						const embed = new client.RichEmbed()
							.setColor(client.util.hexColor(message))
							.addField(':globe_with_meridians: Global prefixes', client.util.sendCode(`${prefixes.slice(0, -1).join(' or ')}`, { code: 'fix' }))
							.addField(':house: Server prefix', client.util.sendCode(guild.prefix ? guild.prefix : 'Not yet defined', { code: 'fix' }))
							new Date(guild.createdAt).getTime() !== new Date(guild.updatedAt).getTime() ? embed.setFooter(`Updated ${client.util.checkDays(guild.updatedAt) !== '0 days' ? `${client.util.checkDays(guild.updatedAt)} ago` : 'today'}`) : undefined;
						message.channel.send(embed);
					}
				});

				prefixes.filter(async (prefix) => {
          if (message.content.startsWith(prefix)) {
            if (message.author.bot) return;

            const params = message.content.slice(prefix.length).split(/ +/);
            const commandName = params.shift().toLowerCase();
            const command = client.commands.get(commandName) || client.commands.find((command) => command.aliases && command.aliases.includes(commandName));
            const permission = client.elevation(message);

            if (!command) return;
            if (!message.guild.me.permissions.toArray().includes(command.permissions)) {
              const reqPermissions = client.util.difference(command.permissions, message.guild.me.permissions.toArray());
              if (reqPermissions.length > 0) return message.reply(`for this command to work I need the following permissions: \`${reqPermissions.join('\`, \`')}\`.`);
            }

            if (command.category === 'nsfw' && !message.channel.nsfw) {
              return message.channel.send(new client.RichEmbed()
                .setColor(client.util.hexColor('ERROR'))
                .setTitle('NSFW Command')
                .setDescription('Please switch to NSFW channel in order to use this command.')
                .setImage('https://a.kyouko.se/m3cN.jpg')
              );
            }

            if (command.params && !params.length) {
              return message.reply('you did not provide any parameters.')
                .then(() => {
                  if (command.usage) {
                    message.channel.send(new client.RichEmbed()
                      .setColor(client.util.hexColor(message))
                      .setTitle('Usage')
                      .setDescription(`${prefix}${command.name} ${command.usage}`)
                    );
                  }
                });
            }

            if (permission < command.permissionLevel) return;
            if (message.author.id !== client.config.ownerID && !command.enabled) return message.reply('sorry the command has been \`Disabled\`.');

            if (!client.cooldowns.has(command.name)) {
              client.cooldowns.set(command.name, new (require('discord.js')).Collection());
            }

            const now = Date.now();
            const timestamps = client.cooldowns.get(command.name);
            const cooldownAmount = (command.cooldown || 3) * 1E3;

            if (timestamps.has(message.author.id)) {
              const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
              if (now < expirationTime) {
                const timeLeft = ((expirationTime - now) / 1E3).toFixed(1);
                return message.reply(`please wait \`${timeLeft}\` more second(s).`).then((_message) => _message.delete(timeLeft * 1E3));
              }
            }

            timestamps.set(message.author.id, now);
            setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

            try {
              const commandExists = await CommandController.findOne(command.name);
              if (commandExists) {
                await CommandController.update(command.name, { $set: { count: commandExists.count + 1 } });
              } else {
                await CommandController.add(command);
              }

              command.execute(client, message, params);
            } catch (error) {
              client.log(error.message, { tags: ['execute'], color: 'red' });
            }
          }
				});
			} else if (guild === null) {
				const addGuild = await GuildController.add(message.guild);
				message.channel.send(new client.RichEmbed()
          .setColor(client.util.hexColor('WARNING'))
          .setDescription(':warning: : I noticed that the server information is not in my records, I am correcting now, try again later.')
        );
			}
		} catch (error) {
			client.log(error.message, { tags: ['message'], color: 'red' });
		}
	}
};