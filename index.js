const Manager = new (require('discord.js')).ShardingManager('./core/Juge.js', {
	totalShards: 1,
	respawn: true,
	token: process.env.JUGE_TOKEN
});

Manager.on('launch', (shard) => console.log('shard', `Launching shard ${shard.id + 1}/${Manager.totalShards}`));
Manager.spawn();
