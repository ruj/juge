const { FileUtils } = require('../');

module.exports = {
  load(client) {
    this.initializeCommands(client);
  },

  initializeCommands(client, directory = 'core/commands') {
    return FileUtils.requireDirectory(directory, (command) => {
      client.commands.set(command.name, command);

      if (command.aliases) {
        command.aliases.forEach((alias) => client.aliases.set(alias, command.name));
      }
    }, console.error);
  }
};