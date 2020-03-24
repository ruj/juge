const {
	Client,
	Collection,
	MessageAttachment,
	MessageEmbed
} = require('discord.js')
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
		this.speeches = new Collection()
		this.MessageAttachment = MessageAttachment
		this.MessageEmbed = MessageEmbed
		this.utils = require('../utils')
		this.config = config

		this.officialEmojis
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

	getAndStoreEmojis() {
		const emojis = this.emojis.cache.filter(({ guild }) => guild.id === process.env.JUGE_EMOJI_GUILD)
		this.officialEmojis = emojis
	}

	getEmoji(emojiName, solve = true) {
		const matchingEmoji = this.officialEmojis.find((emoji) => emoji.name.toLowerCase() === emojiName.toLowerCase())
		return solve ? matchingEmoji.toString() : matchingEmoji
	}
}