module.exports = (Juge) => {
	Juge.user.setPresence({ game: { name: `@${Juge.user.username}` }, status: 'dnd' });
	Juge.log(`${Juge.user.tag} (${Juge.user.id})`, 'ready');

	activity();
	setInterval(activity, 60 * 2 * 1E3);

	function activity() {
		const presences = [
			{
				name: Juge.util.randomItem(Juge.config.prefixes),
				type: 'PLAYING'
			}, {
				name: `${Juge.users.filter((user) => !user.bot && user.presence.status !== 'offline').map((user) => user).length} Users`,
				type: 'WATCHING'
			}
		];

		for (let i = 0; i < presences.length; i++) {
			((k) => setTimeout(() => Juge.user.setPresence({ game: presences[k], status: 'online' }), 1E3 + (60 * 1E3 * k)))(i);
		}
	}
};