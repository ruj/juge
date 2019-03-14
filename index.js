let Discord 		= require('discord.js');
	moment 			= require('moment');
	colors 			= require('colors');
	CREDENTIALS 	= require('./settings/credentials.js');
	Manager 		= new Discord.ShardingManager('./juge.js', { totalShards: 'auto', respawn: true, token: CREDENTIALS.TOKEN });
	log = (msg) => { console.log(`| ${moment().format('DD-MM-YYYY | HH:mm:ss')} | ${msg} |`); };

Manager.on('launch', (shard) => {
	log(`${colors.yellow('SHD')} | Launching shard ${shard.id + 1}/${Manager.totalShards}`);
});

Manager.spawn();