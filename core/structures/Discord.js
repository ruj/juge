const { Client, Collection, RichEmbed } = require('discord.js');

module.exports = class extends Client {
	constructor(config) {
		super({
			disableEveryone: true
		});

		this.commands = new Collection();
		this.aliases = new Collection();
		this.cooldowns = new Collection();
		this.RichEmbed = RichEmbed;
		this.log = (message, ...tags) => console.log(...tags.map((tag) => tag), message);
		this.util = require('../util/Util.js');
		this.config = config;
	}
};