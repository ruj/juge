const { FileUtils } = require('../');

module.exports = {
  load(client) {
    this.initializeListeners(client);
  },

  async initializeListeners(client, directory = 'core/listeners') {
    return FileUtils.requireDirectory(directory, (listener, event) => {
      client.on(event, listener.bind(null, client));
    }, console.error);
  }
};