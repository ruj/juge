module.exports = (Juge) => {
	Juge.user.setPresence({ game: { name: process.env.PREFIX }, status: 'online' });
	Juge.log(`${Juge.user.tag} (${Juge.user.id})`, 'ready');
};