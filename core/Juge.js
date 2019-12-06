const Juge = new (require('./structures/Discord.js'))({
	prefixes: process.env.PREFIXES.split(','),
	ownerID: process.env.OWNER_ID,
	subreddits: require('./assets/json/subreddits.json')
});
const express = (require('express'))();
const fs = require('fs');

express.listen(process.env.PORT, () => Juge.log(`Up and running on port: ${process.env.PORT}`, 'HTTP'));

(events = module.exports.events = (dir = `${__dirname}/events/`) => {
	fs.readdir(dir, (error, files) => {
		if (error) return Juge.log(error.message, 'events');
		files.forEach((file) => {
			if (fs.lstatSync(dir + file).isDirectory()) {
				events(dir + file + '/');
				return;
			}
			const event = require(dir + file);
			Juge.on(file.split('.')[0], event.bind(null, Juge));
		});
	});
})();

(commands = module.exports.events = (dir = `${__dirname}/commands/`) => {
	fs.readdir(dir, (error, files) => {
		if (error) return Juge.log(error.message, 'commands');
		files.forEach((file) => {
			if (fs.lstatSync(dir + file).isDirectory()) {
				commands(dir + file + '/');
				return;
			}
			delete require.cache[require.resolve(dir + file)];
			const command = require(dir + file);
			Juge.commands.set(command.name, command);
			if (command.aliases) command.aliases.forEach((alias) => Juge.aliases.set(alias, command.name));
		});
	});
})();

require('./structures/Mongo.js')(Juge);
Juge.login(process.env.JUGE_TOKEN).catch(console.error);