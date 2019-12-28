// Initialize shards
const SHARD_OPTIONS = {
  token: process.env.JUGE_TOKEN
};

const { ShardingManager } = require('discord.js');
const Manager = new ShardingManager('./core/Juge.js', SHARD_OPTIONS);

Manager.on('launch', (shard) => console.log('shard', `Launching shard ${shard.id + 1}/${Manager.totalShards}`));
Manager.spawn();
