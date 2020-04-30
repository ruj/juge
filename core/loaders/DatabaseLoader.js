const { Mongo } = require('../database');

module.exports = {
  load(client) {
    this.initializeDatabase(client);
  },

  initializeDatabase(client) {
    client.database = Mongo;
    client.database.connect(client)
      .then(() => client.log('Database connection established', { tags: ['Database'], color: 'cyan' }))
      .catch((error) => {
        client.log(error.message, { tags: ['Database'], color: 'red' });
        client.database = null;
      })
  }
};