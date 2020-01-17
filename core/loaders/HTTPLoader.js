const { promisify } = require('util');
const { resolve } = require('path');
const { readdir } = require('fs');
const express = require('express');
const cors = require('cors');

const { Route } = require('../');

const app = express();
const readdirAsync = promisify(readdir);

module.exports = {
  load(client) {
    this.initializeHTTPServer(client);
  },

  initializeHTTPServer(client, port = process.env.PORT) {
    if (!port) return client.log(`Server not started - Environment variable "PORT" is not set`, { tags: ['HTTP'], color: 'red' });

    app.use(cors());
    app.use(express.json());

    app.listen(port, () => client.log(`Up and running on port ${port}`, { tags: ['HTTP'] }));

    return this.initializeRoutes(client);
  },

  async initializeRoutes(client, directory = 'core/http/api') {
    const files = await readdirAsync(directory);

    files.forEach((file) => {
      const path = resolve(directory, file);

      if (file.endsWith('.js')) {
        this.addRoute(client, Object.assign(require(path), { name: file.split('.')[0] }));
      }
    });
  },

  addRoute(client, route) {
    route.register(client, app, Route.getPath(route.name));
  }
};