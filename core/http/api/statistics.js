const { Router } = require('express');

module.exports = {
  register(client, app, path) {
    const router = Router();

    router.get('/', (request, response) => {
      response.status(200).json({
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