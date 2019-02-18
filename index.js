let Discord 		= require('discord.js');
    randomPuppy 	= require('random-puppy');
    upperCase 		= require('upper-case');
    snekfetch 		= require('snekfetch');
    express 		= require('express');
    nekos 		= require('nekos.life');
    request 		= require('request');
    moment 		= require('moment');
			  require('moment-duration-format');
    colors 		= require('colors');
    con 		= require('./sql.js');
    app 		= express();
    fs 			= require('fs');
    CONFIG 		= require('./settings/config.js');
    CREDENTIALS 	= require('./settings/credentials.js');
    talkedRecently 	= new Set();
    neko 		= new nekos();
    b 			= new Discord.Client();
    log = (msg) => { console.log(`| ${moment().format('DD-MM-YYYY | HH:mm:ss')} | ${msg} |`); };

app.listen(process.env.PORT || 3000 ,function() {
	log(`Up and running on port: ${process.env.PORT}`);
});

b.on('ready', () => {
	b.user.setPresence({ game: { name: 'initializing...' }, status: 'dnd'});//.then(console.log).catch(console.error);
	current_presence();
	setInterval(() => { current_presence() }, 36 * 10E3);
	log(`${colors.green('RDY')} | ${colors.bgMagenta(`${b.user.tag} (${b.user.id})`)} | GUILDS >> ${colors.cyan(b.guilds.size)} | CHANNELS >> ${colors.cyan(b.channels.size)} | USERS >> ${colors.cyan(b.users.size)}`);
});

b.on('disconnect', () => log(`${colors.red('DSC')} | YOUR BITCH HAS DISCONNECTED AND WILL RESTART`));
b.on('reconnecting', () => log(`${colors.yellow('REC')} | YOUR BITCH STARTED AGAIN!`));

b.on('guildCreate', guild => {
	log(`${colors.cyan('ADD')} | Added to a new guild: ${guild.name} (${guild.id})`);
});

b.on('guildDelete', guild => {
	log(`${colors.red('DEL')} | Removed from a guild: ${guild.name} (${guild.id})`);
});

b.commands = new Discord.Collection();
b.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
	if (err) log(`| ${colors.red('ERR')} | Error: ${err}`);
	log(`${colors.gray('LOG')} | Loading a total of ${colors.green(files.length - CONFIG.OWNERCMDSQUANTITY)} commands`);
	files.forEach(f => {
		let files = require(`./commands/${f}`);
		//log(`| ${colors.gray('LOG')} | Loading command: ${upperCase(files.help.name)}`);
		b.commands.set(files.help.name, files);
		files.conf.aliases.forEach(alias => {
			b.aliases.set(alias, files.help.name);
		});
	});
});

b.on('message', message => {
	if (!message.content.startsWith(CONFIG.PREFIX)) return;
	let hub = message.content.slice(CONFIG.PREFIX.length).trim().split(/ +/g);
	let command = hub.shift().toLowerCase();
	// let command = message.content.split(' ')[0].slice(CONFIG.PREFIX.length);
	let params = message.content.split(' ').slice(1);
	let perms = b.elevation(message);
	let cmd;
	con.get(`SELECT * FROM blacklist WHERE snowflake = ? AND guild = ?`, message.author.id, message.guild.id, (e, r) => {
		if (e) throw e;
		if (r) return message.reply('you are blacklisted.');
		if (b.commands.has(command)) {
			cmd = b.commands.get(command);
		} else if (b.aliases.has(command)) {
			cmd = b.commands.get(b.aliases.get(command));
		}
		if (cmd) {
			if (perms < cmd.conf.permLevel) return;
			cmd.run(Discord, b, message, params, perms);
		}
	});
	// TERMINAL LOG
	log(`${colors.blue('CMD')} | ${message.author.tag} (${message.author.id}) | ${message.guild.name} (${message.guild.id}) | ${colors.yellow(upperCase(`${CONFIG.PREFIX + command}`))}`)
});

b.reload = function(command) {
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

b.elevation = function(message) {
	let permlvl = 0;/*
	let mod_role = message.guild.roles.find('name', 'Moderation Creoles');
	if (mod_role && message.member.roles.has(mod_role.id)) permlvl = 1;
	let sec_role = message.guild.roles.find('name', 'Coon Secretary');
	if (sec_role && message.member.roles.has(sec_role.id)) permlvl = 2;
	let admin_role = message.guild.roles.find('name', 'Lil African Boyz');
	if (admin_role && message.member.roles.has(admin_role.id)) permlvl = 3;*/
	if (message.author.id === CREDENTIALS.OWNERID) permlvl = 4;
	return permlvl;
};

function current_presence() {
	fs.readdir('./commands/', (e, files) => {
		var topics = [ 'cum', 'cumshot', 'anal', 'oral', 'teen', 'tits', 'milf', 'creampie' ];
		var Pornsearch = require('pornsearch').search(topics[Math.round(Math.random)]);
		Pornsearch.videos().then(vids => {
			var randVid = vids.map(vid => vid.title);
			var botPresence = [
				{ game: { name: CONFIG.PREFIX, type: 'PLAYING' }, status: 'online' },
				{ game: { name: `${files.length - CONFIG.OWNERCMDSQUANTITY} comando${files.length - CONFIG.OWNERCMDSQUANTITY == 1 ? '' : 's'}`, type: 'WATCHING' }, status: 'online' },
				{ game: { name: `${b.guilds.reduce((a, b) => a + b.memberCount, 0).toLocaleString() - 1} usuários`, type: 'LISTENING' }, staus: 'online' },
				{ game: { name: `${b.guilds.size} servidor${b.guilds.size == 1 ? '' : 'es'}`, type: 'WATCHING' }, status: 'online' },
				{ game: { name: randVid[Math.floor(Math.random() * randVid.length)], type: 'WATCHING' }, status: 'online' },
				{ game: { name: `undefined`, type: 'STREAMING', url: 'https://www.twitch.tv/ayytenasa' }, status: 'dnd' }];
			var presence = botPresence;
			presence.sort(function() { return .5 * Math.random });
			for (let i = 0; i < presence.length; i++) {
				(function (ind) {
					setTimeout(() => {
						b.user.setPresence(presence[ind]);
					}, 1E3 + (60 * 1E3 * ind));
				})(i);
			}
		});
	});
}

b.login(CREDENTIALS.TOKEN);
