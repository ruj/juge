const express = require('express');

module.exports = ({ log }, app = express(), port = process.env.PORT) => {
  if (!port) return log(`Server not started - Environment variable "PORT" is not set`, { tags: ['HTTP'], color: 'red' });

  app.listen(port, () => log(`Up and running on port ${port}`, { tags: ['HTTP'] }));
};