const { Router } = require('express');

module.exports = {
  register(client, app, path) {
    const router = Router();

    router.get('/', (request, response) => {
      response.status(200).json(client.commands.filter(({ category }) => category !== 'developer').array());
    });

    router.get('/:name', (request, response) => {
      const command = client.commands.find((command) => command.name === request.params.name || command.aliases.includes(request.params.name));

      if (!command) return response.status(400).json({ message: 'Invalid command' });

      return response.status(200).json(command);
    });

    app.use(path, router);
  }
};