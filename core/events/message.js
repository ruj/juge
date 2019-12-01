const { GuildController } = require('../database/controllers');

module.exports = (Juge, message) => {
	Juge.elevation = (message) => {
		let level = 0;
		if (message.author.id === Juge.config.ownerID) level = 9;
		return level;
	};

	if (message.channel.type !== 'dm') {
		GuildController.findOne(message.guild)
			.then((guild) => {
				if (guild !== null) {
					let prefixes = Juge.config.prefixes.concat(guild.prefix);

					Array(`<@${Juge.user.id}>`, `<@!${Juge.user.id}>`).find((juge) => {
						if (message.content.startsWith(juge)) {
							const embed = new Juge.RichEmbed()
								.setColor(Juge.util.hexColor.embed(message))
								.addField(':globe_with_meridians: Global prefixes', Juge.util.sendCode(`${prefixes.slice(0, -1).join(' or ')}`, { code: 'fix' }))
								.addField(':house: Server prefix', Juge.util.sendCode(guild.prefix ? guild.prefix : 'Not yet defined', { code: 'fix' }))
								new Date(guild.createdAt).getTime() !== new Date(guild.updatedAt).getTime() ? embed.setFooter(`Updated ${Juge.util.checkDays(guild.updatedAt) !== '0 days' ? `${Juge.util.checkDays(guild.updatedAt)} ago` : 'today'}`) : undefined;
							message.channel.send(embed);
						}
					});

					prefixes.find((prefix) => {
						if (message.author.bot || !message.content.startsWith(prefix)) return;
					
						const params = message.content.slice(prefix.length).split(/ +/);
						const commandName = params.shift().toLowerCase();
						const command = Juge.commands.get(commandName) || Juge.commands.find((command) => command.aliases && command.aliases.includes(commandName));
						const permission = Juge.elevation(message);

						if (!command) return;
						if (!message.guild.me.permissions.toArray().includes(command.permissions)) {
							const reqPermissions = Juge.util.difference(command.permissions, message.guild.me.permissions.toArray());
							if (reqPermissions.length > 0) return message.reply(`for this command to work I need the following permissions: \`${reqPermissions.join('\`, \`')}\`.`);
						}

						if (command.category === 'nsfw' && !message.channel.nsfw) {
							const embed = new Juge.RichEmbed()
								.setColor(Juge.util.hexColor.error)
								.setTitle('NSFW Command')
								.setDescription('Please switch to NSFW channel in order to use this command.')
								.setImage('https://a.kyouko.se/m3cN.jpg')
							return message.channel.send(embed);
						}

						if (command.params && !params.length) {
							return message.reply('you did not provide any parameters.')
								.then(() => {
									if (command.usage) {
										const embed = new Juge.RichEmbed()
											.setColor(Juge.util.hexColor.embed(message))
											.setTitle('Usage')
											.setDescription(`${prefix}${command.name} ${command.usage}`);
										message.channel.send(embed);
									}
								});
						}

						if (permission < command.permissionLevel) return;
						if (message.author.id !== Juge.config.ownerID && !command.enabled) return message.reply('sorry the command has been \`Disabled\`.');
						
						if (!Juge.cooldowns.has(command.name)) {
							Juge.cooldowns.set(command.name, new (require('discord.js')).Collection());
						}

						const now = Date.now();
						const timestamps = Juge.cooldowns.get(command.name);
						const cooldownAmount = (command.cooldown || 3) * 1E3;
						
						if (timestamps.has(message.author.id)) {
							const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
							if (now < expirationTime) {
								const timeLeft = (expirationTime - now) / 1E3;
								return message.reply(`please wait \`${timeLeft.toFixed(1)}\` more second(s).`);
							}
						}

						timestamps.set(message.author.id, now);
						setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

						try {
							command.execute(Juge, message, params);
						} catch (error) {
							Juge.log(error.message, 'execute');
						}
					});
				} else if (guild === null) {
					GuildController.add(message.guild)
						.then(() => {
							const embed = new Juge.RichEmbed()
								.setColor(Juge.util.hexColor.warning)
								.setDescription(':warning: : I noticed that the server information is not in my records, I am correcting now, try again later.')
							message.channel.send(embed);
						})
						.catch((error) => Juge.log(error.message, 'message', 'GuildController/add'));
				}
			})
			.catch((error) => Juge.log(error.message, 'message', 'GuildController'));
	}
};