const { readdir, lstatSync } = require('fs');
const { promisify } = require('util');
const { resolve } = require('path');

const readdirAsync = promisify(readdir);

module.exports = {
  load(client) {
    this.initializeCommands(client);
  },

  async initializeCommands(client, directory = 'core/commands', recursive = true) {
    const files = await readdirAsync(directory);

    files.forEach((file) => {
      const path = resolve(directory, file);

      if (file.endsWith('.js')) {
        delete require.cache[require.resolve(path)];
        const command = require(path);
        client.commands.set(command.name, command);
        if (command.aliases) command.aliases.forEach((alias) => client.aliases.set(alias, command.name));
      } else if (recursive) {
        const isDirectory = lstatSync(path).isDirectory();

        if (isDirectory) {
          this.initializeCommands(client, path);
        }
      }
    });
  }
};