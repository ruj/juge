const API_URL = 'http://api.oboobs.ru';

module.exports = {
	getBoobs(start = 0, count = 1, order = 'random') {
		return this._get(`/boobs/${start}/${count}/${order}`).then((response) => response);
	},

	getNoise(count = 1) {
		return this._get(`/noise/${count}`).then((response) => response);
	},

	searchModel(model) {
		return this._get(`/boobs/model/${model}`).then((response) => response);
	},

	searchAuthor(author) {
		return this._get(`/boobs/author/${author}`).then((response) => response);
	},

	getBoobsById(id) {
		return this._get(`/boobs/get/${id}`).then((response) => response);
	},

	getBoobsCount() {
		return this._get('/boobs/count').then((response) => response);
	},

	getNoiseCount() {
		return this._get('/noise/count').then((response) => response);
	},

	voteForBoobs(id, operation) {
		return this._get(`/boobs/vote/${id}/${operation}`).then((response) => response);
	},

	voteForNoise(id, operation) {
		return this._get(`/noise/vote/${id}/${operation}`).then((response) => response);
	},

	_get(endpoint) {
		return require('node-fetch')(`${API_URL}${endpoint}`).then((response) => response.json());
	}
};