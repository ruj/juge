let Discord 		= require('discord.js');
	Jimp 			= require('jimp')
	randomPuppy 	= require('random-puppy');
	upperCase 		= require('upper-case');
	snekfetch 		= require('snekfetch');
	request 		= require('request');
	moment 			= require('moment');
					  require('moment-duration-format');
	express 		= require('express');
	booru 			= require('booru');
	nekos 			= require('nekos.life');
	colors 			= require('colors');
	con 			= require('./sql.js');
	path 			= require('path');
	fs 				= require('fs');
	CONFIG 			= require('./settings/config.js');
	CONTENT 		= require('./settings/content.js');
	CREDENTIALS 	= require('./settings/credentials.js');
	Utils 			= require('./utils.js');
	app 			= express();
	talkedRecently 	= new Set();
	neko 			= new nekos();
	b 				= new Discord.Client();
	log = (msg) => { console.log(`| ${moment().format('DD-MM-YYYY | HH:mm:ss')} | ${msg} |`); };

app.listen(process.env.PORT || 3000, () => {
	log(`    | Up and running on port: ${process.env.PORT}`);
});

b.on('ready', () => {
	b.user.setPresence({ game: { name: 'initializing...' }, status: 'dnd'});
	current_presence();
	setInterval(() => { current_presence() }, 48 * 10E3);
	log(`${colors.green('RDY')} | ${colors.bgMagenta(`${b.user.tag} (${b.user.id})`)} | GUILDS >> ${colors.cyan(b.guilds.size)} | CHANNELS >> ${colors.cyan(b.channels.size)} | USERS >> ${colors.cyan(b.users.size)}`);
});

b.on('disconnect', () => log(`${colors.red('DSC')} | YOUR BITCH HAS DISCONNECTED AND WILL RESTART`));
b.on('reconnecting', () => log(`${colors.yellow('REC')} | YOUR BITCH STARTED AGAIN!`));

b.on('guildCreate', (guild) => {
	log(`${colors.cyan('ADD')} | Added to a new guild: ${guild.name} (${guild.id})`);
});

b.on('guildDelete', (guild) => {
	log(`${colors.red('DEL')} | Removed from a guild: ${guild.name} (${guild.id})`);
});

b.commands = new Discord.Collection();
b.aliases = new Discord.Collection();

let load_commands = module.exports.load_commands = (dir = './commands/') => {
	fs.readdir(dir, (e, files) => {
		if (e) return console.log(e);
		files.forEach((f) => {
			if (fs.lstatSync(dir + f).isDirectory()) {
				load_commands(dir + f + '/');
				return;
			}
			delete require.cache[require.resolve(`${dir}${f}`)];
			let file = require(`${dir}${f}`);
			b.commands.set(file.config.name, file);
			if (file.config.aliases) file.config.aliases.forEach((alias) => {
				b.aliases.set(alias, file.config.name);
			});
		});
	});
}
load_commands();

b.on('message', (message) => {
	if (!message.content.startsWith(CONFIG.PREFIX)) return;
	if (message.channel.type === 'dm') return;
	let hub = message.content.slice(CONFIG.PREFIX.length).trim().split(/ +/g);
	let cmd = hub.shift().toLowerCase();
	let params = message.content.split(' ').slice(1);
	let perms = b.elevation(message);
	let command;
	con.get(`SELECT * FROM blacklist WHERE snowflake = ? AND guild = ?`, message.author.id, message.guild.id, (e, r) => {
		if (e) throw e;
		var emote = b.emojis.get('550388717567737867');
		if (r) return message.react(emote.id);
		if (b.commands.has(cmd)) {
			command = b.commands.get(cmd);
		} else if (b.aliases.get(cmd)) {
			command = b.commands.get(b.aliases.get(cmd));
		}
		if (command) {
			if (perms < command.config.permlevel) return;
			if (message.author.id !== CREDENTIALS.OWNERID && !command.config.enabled) return message.reply('Sorry the command has been \`Disabled\`.');
			command.run(Discord, b, message, params, perms);
			log(`${colors.blue('CMD')} | ${message.author.tag} (${message.author.id}) | ${message.guild.name} (${message.guild.id}) | ${colors.yellow(upperCase(`${CONFIG.PREFIX + cmd}`))}`);
		}
	});
});
/* OUTDATED
b.reload = (command) => {
	return new Promise((resolve, reject) => {
		try {
			delete require.cache[require.resolve(`./commands/${command}`)];
			let cmd = require(`./commands/${command}`);
			b.commands.delete(command);
			b.aliases.forEach((cmd, alias) => {
				if (cmd === command) b.aliases.delete(alias);
			});

			b.commands.set(command, cmd);
			cmd.conf.aliases.forEach(alias => {
				b.aliases.set(alias, cmd.help.name);
			});
			resolve();
		} catch (e) {
			reject(e);
		}
	});
};
*/
b.elevation = (message) => {
	let permlevel = 0;
	if (CREDENTIALS.SUPPORTERSID.includes(message.author.id) || message.author.id === CREDENTIALS.OWNERID) permlevel = 1
	if (message.author.id === CREDENTIALS.OWNERID) permlevel = 2;
	return permlevel;
};

function current_presence() {
	fs.readdir('./commands/', (e, files) => {
		var Pornsearch = require('pornsearch').search(Utils.randomItem([ 'cum', 'cumshot', 'anal', 'oral', 'teen', 'tits', 'milf', 'creampie' ])).driver(Utils.randomItem([ 'pornhub', 'sex', 'redtube', 'xvideos' ]));
		Pornsearch.videos().then((video) => {
			var randomVideo = video.map(v => v.title);
			var users = [];
			for (var i = 0; i < b.users.size; i++) {
				if (b.users.map(b => b.bot)[i] == false) {
					users.push(b.users.map(u => u.tag)[i]);
				}
			}
			function comlength() {
				return b.commands.filter((c) => CONFIG.CATEGORIES.includes(c.config.category)).map((n) => n.config.name).length;
			}

			var botPresence = [
				{ game: { name: CONFIG.PREFIX, type: 'PLAYING' }, status: 'online' },
				{ game: { name: `${files.length - CONFIG.RESTRICTEDCATEGORIES.length} categor${files.length - CONFIG.RESTRICTEDCATEGORIES.length == 1 ? 'y' : 'ies'}`, type: 'WATCHING' }, status: 'online' },
				{ game: { name: `${comlength()} command${comlength() == 1 ? '' : 's'}`, type: 'WATCHING' }, status: 'online' },
				{ game: { name: `${users.length} users`, type: 'LISTENING' }, staus: 'online' },
				{ game: { name: `${b.guilds.size} guild${b.guilds.size == 1 ? '' : 's'}`, type: 'WATCHING' }, status: 'online' },
				{ game: { name: `${b.shard.count} shard${b.shard.count == 1 ? '' : 's'}`, type: 'PLAYING' }, status: 'online'},
				{ game: { name: `${Utils.randomItem(randomVideo)} on ${Pornsearch.current()}`, type: 'WATCHING' }, status: 'online' },
				{ game: { name: `undefined`, type: 'STREAMING', url: 'https://www.twitch.tv/ayytenasa' }, status: 'dnd' }];
			for (let i = 0; i < botPresence.length; i++) {
				(function (ind) {
					setTimeout(() => {
						b.user.setPresence(botPresence[ind]);
					}, 1E3 + (60 * 1E3 * ind));
				})(i);
			}
		});
	});
}

b.login(CREDENTIALS.TOKEN);