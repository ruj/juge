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
				name: `${client.users.cache.filter((user) => !user.bot && user.presence.status !== 'offline').array().length} Users`,
				type: 'WATCHING'
			}, {
				name: `${client.guilds.cache.filter(({ memberCount }) => memberCount > 25).size} Guilds`,
				type: 'WATCHING'
			}
		];

		presences.forEach((presence, index) => setTimeout(() => client.user.setPresence({ activity: presence }), 60 * (ACTIVITY_INTERVAL * index) * 1E3));

		setTimeout(activity, 60 * (ACTIVITY_INTERVAL * presences.length) * 1E3);
	}, (Math.random() * 10).toFixed(3) * 1E3);

	client.getAndStoreEmojis();
};