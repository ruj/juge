module.exports = (client) => {
	client.user.setPresence({ game: { name: `@${client.user.username}` }, status: 'dnd' });
	client.log(`${client.user.tag} (${client.user.id})`, { tags: ['ready'], color: 'green'});

	activity();
	setInterval(activity, 60 * 2 * 1E3);

	function activity() {
		const presences = [
			{
				name: client.util.randomItem(client.config.prefixes),
				type: 'PLAYING'
			}, {
				name: `${client.users.filter((user) => !user.bot && user.presence.status !== 'offline').map((user) => user).length} Users`,
				type: 'WATCHING'
			}
		];

		for (let i = 0; i < presences.length; i++) {
			((k) => setTimeout(() => client.user.setPresence({ game: presences[k], status: 'online' }), 1E3 + (60 * 1E3 * k)))(i);
		}
	}
};