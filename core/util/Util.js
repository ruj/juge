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
      let hexColor = message.hasOwnProperty('displayHexColor')
      ? message.displayHexColor
      : message.guild.me.displayHexColor;

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
	},

  uptime(ms) {
    let days, hours, minutes, seconds;

    seconds = Math.floor(ms / 1000);
    minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;
    hours = Math.floor(minutes / 60);
    minutes = minutes % 60;
    days = Math.floor(hours / 24);
    hours = hours % 24;

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }
};