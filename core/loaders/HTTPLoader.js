const express = require('express');
const cors = require('cors');

const { FileUtils } = require('../');

const app = express();

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
    return FileUtils.requireDirectory(directory, (route, routeName, subpath) => {
      this.addRoute(client, Object.assign(route, { path: `/${subpath}/${routeName}` }));
    }, console.error);
  },

  addRoute(client, route) {
    route.register(client, app, route.path);
  }
};