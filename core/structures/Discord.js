const { Client, Collection, RichEmbed } = require('discord.js');

module.exports = class extends Client {
	constructor(config) {
		super({
			fetchAllMembers: true,
			disableEveryone: true,
			disabledEvents: ['TYPING_START']
		});

		this.commands = new Collection();
		this.aliases = new Collection();
		this.cooldowns = new Collection();
		this.RichEmbed = RichEmbed;
		this.log = (message, ...tags) => console.log(...tags.map((tag) => tag), message);
		this.util = require('../util/Util.js');
		this.Reddit = require('../util/Reddit.js');
		this.config = config;
	}
};