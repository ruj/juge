const { promisify } = require('util');
const { resolve } = require('path');
const { readdir } = require('fs');

const readdirAsync = promisify(readdir);

module.exports = {
  load(client) {
    this.initializeListeners(client);
  },

  async initializeListeners(client, directory = 'core/listeners') {
    const files = await readdirAsync(directory);

    files.forEach((file) => {
      const path = resolve(directory, file);

      if (file.endsWith('.js')) {
        const event = require(path);
        client.on(file.split('.')[0], event.bind(null, client));
      }
    });
  }
};