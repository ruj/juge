const { randomItem } = require('./Util.js');
const fetch = require('node-fetch');

module.exports = async (subreddit) => {
	subreddit = randomItem(subreddit).replace('/r/', '');
	let body = await fetch(`https://reddit.com/r/${subreddit}/random.json`).then((response) => response.json());

	return body[0] && body[0].data.children[0].data;
};