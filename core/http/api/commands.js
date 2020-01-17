const { Router } = require('express');

module.exports = {
  register(client, app, path) {
    const router = Router();

    router.get('/', (request, response) => {
      response.status(200).json(client.commands.filter(({ category }) => category !== 'developer').map((command) => command));
    });

    app.use(path, router);
  }
};