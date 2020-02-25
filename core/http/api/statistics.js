const { Router } = require('express');

module.exports = {
  register(client, app, path) {
    const router = Router();

    router.get('/', (request, response) => {
      response.status(200).json({
        categories: {
          count: client.utils.uniqueItems(client.commands.filter(({ category }) => category !== 'developer').map(({ category }) => category)).length
        },
        commands: {
          count: client.commands.filter(({ category }) => category !== 'developer').array().length
        },
        users: {
          count: client.users.size
        },
        uptime: {
          process: process.uptime() * 1E3
        }
      });
    });

    app.use(path, router);
  }
};