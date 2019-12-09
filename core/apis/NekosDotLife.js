const API_URL = 'http://nekos.life/api/v2';

module.exports = {
	eightBall() {
		return this._get('/8ball').then((response) => response);
	},

	cat() {
		return this._get('/cat').then((response) => response);
	},

	chat(message) {
		return this._get(`/chat?text=${message}`).then((response) => response);
	},

	fact() {
		return this._get('/fact').then((response) => response);
	},

	image(category) {
		return this._get(`/img/${category}`).then((response) => response);
	},

	owoify(text) {
		return this._get(`/owoify?text=${text}`).then((response) => response);
	},

	spoiler(text) {
		return this._get(`/spoiler?text=${text}`).then((response) => response);
	},

	why() {
		return this._get('/why').then((response) => response);
	},

	_get(endpoint) {
		return require('node-fetch')(`${API_URL}${endpoint}`).then((response) => response.json());
	}
};