module.exports = {
	checkDays(date) {
		let difference = new Date().getTime() - new Date(date).getTime();
		let days = Math.floor(difference / 86400000);

		return `${days} ${days == 1 ? 'day' : 'days'}`;
	},

	difference(left, right) {
		return left.filter((value) => !right.includes(value));
	},

  hexColor(message) {
    if (typeof message !== 'string' && message) {
      const hexColor = message.guild.me.displayHexColor;

      return hexColor !== '#000000' ? hexColor : '#36393F';
    } else if (message) {
      if (message.toUpperCase() === 'SUCCESS') return '#77B255';
      else if (message.toUpperCase() === 'WARNING') return '#FFCA42';
      else if (message.toUpperCase() === 'ERROR') return '#FF0000';
      else return '#36393F';
    } else {
      return '#36393F';
    }
  },

	randomItem(items) {
		return items[Math.floor(Math.random() * items.length)];
	},

	sendCode(string, { code = '' } = {}) {
		return `\`\`\`${code}\n${string}\`\`\``;
	}
};