const API_URL = 'https://nekobot.xyz/api';

module.exports = {
	imageGen(object) {
		const params = Object.entries(object).map(([key, value]) => `${key}=${value}`).join('&');
		return this._get(`/imagegen?${params}`).then((response) => response);
	},

	image(type) {
		return this._get(`/image?type=${type}`).then((response) => response);
	},

	_get(endpoint) {
		return require('node-fetch')(`${API_URL}${endpoint}`).then((response) => response.json());
	}
};