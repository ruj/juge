const fetch = require('node-fetch');

const ACTIVITY_INTERVAL = 2;

module.exports = (client) => {
	client.user.setPresence({ activity: { name: `@${client.user.username}` } });
	client.log(`${client.user.tag} (${client.user.id})`, { tags: ['ready'], color: 'green'});

	setTimeout(function activity() {
		const presences = [
			{
				name: client.utils.randomItem(client.config.prefixes),
				type: 'PLAYING'
			}, {
				name: `${client.users.cache.filter((user) => !user.bot && user.presence.status !== 'offline').size} Users`,
				type: 'WATCHING'
			}, {
				name: `${client.guilds.cache.filter(({ memberCount }) => memberCount >= 25).size} Guilds`,
				type: 'WATCHING'
			}
		];

		presences.forEach((presence, index) => setTimeout(() => client.user.setPresence({ activity: presence }), 60 * (ACTIVITY_INTERVAL * index) * 1E3));

		setTimeout(activity, 60 * (ACTIVITY_INTERVAL * presences.length) * 1E3);
	}, (Math.random() * 10).toFixed(3) * 1E3);

	setTimeout(function postStats() {
		if (process.env.ARCANE_BOT_CENTER) {
			fetch(`https://arcane-botcenter.xyz/api/${client.user.id}/stats`, {
				method: 'POST',
				headers: { Authorization: process.env.ARCANE_BOT_CENTER },
				body: {
					server_count: client.guilds.cache.size,
					shard_count: client.shard.count,
					member_count: client.users.cache.size
				}
			})
			.then(() => client.log('Posted statistics successfully', { tags: ['arcane-botcenter'], color: 'magenta' }))
			.catch(() => client.log('Failed to post statistics', { tags: ['arcane-botcenter'], color: 'blue' }));
		}

		setTimeout(postStats, 1800000);
	}, 60000);

	client.getAndStoreEmojis();
};