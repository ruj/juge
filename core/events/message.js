module.exports = (Juge, message) => {
	Juge.elevation = (message) => {
		let level = 0;
		if (message.author.id === Juge.config.ownerID) level = 9;
		return level;
	};

	if (message.author.bot || !message.content.startsWith(process.env.PREFIX)) return;
	
	const params = message.content.slice(process.env.PREFIX.length).split(/ +/);
	const commandName = params.shift().toLowerCase();
	const command = Juge.commands.get(commandName) || Juge.commands.find((command) => command.aliases && command.aliases.includes(commandName));
	const permission = Juge.elevation(message);

	if (!command) return;
	if (command.guildOnly && message.channel.type !== 'text') return message.reply('I can\'t execute that command inside DMs!');

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
						.setDescription(`${process.env.PREFIX}${command.name} ${command.usage}`);
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
};