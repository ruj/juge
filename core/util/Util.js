module.exports = {
	checkDays(date) {
		let difference = new Date().getTime() - new Date(date).getTime();
		let days = Math.floor(difference / 86400000);

		return `${days} ${days == 1 ? 'day' : 'days'}`;
	},

	difference(left, right) {
		return left.filter((value) => !right.includes(value));
	},

	hex(string) {
		return Buffer.from(string, 'utf8').toString('hex');
	},

	hexColor: {
		embed(message) {
			return message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : '#36393F';
		},
		success: '#77B255',
		warning: '#FFCA42',
		error: '#FF0000'
	},

	randomItem(items) {
		return items[Math.floor(Math.random() * items.length)];
	},

	sendCode(string, options = {}) {
		return `\`\`\`${options.code}\n${string}\`\`\``;
	}
};