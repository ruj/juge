const Juge = new (require('./structures/Client.js'))({
	prefixes: process.env.PREFIXES.split(','),
	ownerID: process.env.OWNER_ID
});

((Loaders) => {
	for (let name in Loaders) {
		Loaders[name].load(Juge);
	}
})(require('./loaders'));

Juge.login().catch(console.error);