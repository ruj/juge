const mongoose = require('mongoose');
const { CommandRepository, GuildRepository, UserRepository } = require('./repositories');

module.exports = {
  connect(client) {
    return mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    })
    .then(() => {
      client.database.commands = CommandRepository;
      client.database.guilds = GuildRepository;
      client.database.users = UserRepository;
    })
  }
};