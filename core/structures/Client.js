const { Client, Collection, MessageEmbed } = require('discord.js')
const chalk = require('chalk')
const _ = require('lodash')

module.exports = class extends Client {
	constructor(config) {
		super({
			disableMentions: 'everyone'
		})

		this.commands = new Collection()
		this.aliases = new Collection()
		this.cooldowns = new Collection()
		this.MessageEmbed = MessageEmbed
		this.utils = require('../utils')
		this.config = config
	}

	login(token = process.env.JUGE_TOKEN) {
		return super.login(token)
	}

	log(message, {
		tags = [],
		color = 'white'
	} = {}) {
		const colorista = _.get(chalk, color)
		console.log(...tags.map((tag) => colorista(tag)), chalk.yellow(message))
	}
}