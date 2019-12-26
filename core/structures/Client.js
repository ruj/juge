const { Client, Collection, RichEmbed } = require('discord.js');
const chalk = require('chalk');
const _ = require('lodash');

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
		this.util = require('../util/Util.js');
		this.config = config;
	}

	log(message, {
		tags = [],
		color = 'white'
	} = {}) {
		const colorista = _.get(chalk, color);
		console.log(...tags.map((tag) => colorista(tag)), chalk.yellow(message));
	}

	elevation({ member, author }) {
		let level = 0;

		if (member.permissions.has('MANAGE_CHANNELS')) level = 5;
		if (member.permissions.has('MANAGE_GUILD')) level = 6;
		if (member.permissions.has('ADMINISTRATOR')) level = 7;

		if (author.id === process.env.OWNER_ID) level = 9;

		return level;
	}
};