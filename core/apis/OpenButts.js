const API_URL = 'http://api.obutts.ru';

module.exports = {
	getButts(start = 0, count = 1, order = 'random') {
		return this._get(`/butts/${start}/${count}/${order}`).then((response) => response);
	},

	getNoise(count = 1) {
		return this._get(`/noise/${count}`).then((response) => response);
	},

	searchModel(model) {
		return this._get(`/butts/model/${model}`).then((response) => response);
	},

	searchAuthor(author) {
		return this._get(`/butts/author/${author}`).then((response) => response);
	},

	getButtsById(id) {
		return this._get(`/butts/get/${id}`).then((response) => response);
	},

	getButtsCount() {
		return this._get('/butts/count').then((response) => response);
	},

	getNoiseCount() {
		return this._get('/noise/count').then((response) => response);
	},

	voteForButts(id, operation) {
		return this._get(`/butts/vote/${id}/${operation}`).then((response) => response);
	},

	voteForNoise(id, operation) {
		return this._get(`/noise/vote/${id}/${operation}`).then((response) => response);
	},

	_get(endpoint) {
		return require('node-fetch')(`${API_URL}${endpoint}`).then((response) => response.json());
	}
};