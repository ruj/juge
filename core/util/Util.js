module.exports = {
	difference(left, right) {
		return left.filter((value) => !right.includes(value));
	},

	randomItem(items) {
		return items[Math.floor(Math.random() * items.length)];
	},

	hexColor: {
		embed(message) {
			return message.guild.me.displayHexColor !== '#000000' ? message.guild.me.displayHexColor : '#36393F';
		},
		success: '#77B255',
		warning: '#FFCA42',
		error: '#FF0000'
	},

	sendCode(string, options = {}) {
		return `\`\`\`${options.code}\n${string}\`\`\``;
	},

	checkDays(date) {
		let difference = new Date().getTime() - new Date(date).getTime();
		let days = Math.floor(difference / 86400000);

		return `${days} ${days == 1 ? 'day' : 'days'}`;
	}
};