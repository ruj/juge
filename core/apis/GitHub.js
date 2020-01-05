const API_URL = 'https://api.github.com';

module.exports = {
  getRepository(username, repository, end) {
    return this._get(`/repos/${username}/${repository}${end ? `/${end}` : ''}`).then((response) => response);
  },

  _get(endpoint) {
    return require('node-fetch')(`${API_URL}${endpoint}?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}`).then((response) => response.json());
  }
};