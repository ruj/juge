module.exports = {
  name: 'help',
  aliases: ['h'],
  description: 'Shows details about a command',
  usage: '<category|command>',
  category: 'bot',
  requirements: { botPermissions: ['EMBED_LINKS'] },
  execute(client, message, params) {
    let [ parameter ] = params;

    if (parameter) {
      parameter = parameter.toLowerCase();

      const categories = client.utils.uniqueItems(client.commands.filter(({ category }) => category !== 'developer').map(({ category }) => category));

      if (!client.commands.has(parameter) && !categories.includes(parameter)) parameter = client.commands.filter(({ aliases }) => aliases.includes(parameter)).map(({ name }) => name)[0];
      if (client.commands.has(parameter)) {
        const {
          name,
          aliases,
          description,
          usage
        } = client.commands.get(parameter);

        const embed = new client.RichEmbed()
          .setColor(client.utils.hexColor(message))
          .setTitle(`:mag: ${name}`)
          .setDescription(description)
          .addField(':page_facing_up: Usage', client.utils.sendCode(`${message.content.replace(/(help|h).*/g, '')}${name} ${usage}`, { code: 'fix' }))

          if (aliases.length) embed.addField(':paperclip: Aliases', client.utils.sendCode(aliases.join(' '), { code: 'fix' }));
        message.channel.send(embed);
      } else if (categories.includes(parameter)) {
          const category = client.commands.filter(({ category }) => category === parameter);

          message.channel.send(new client.RichEmbed()
            .setColor(client.utils.hexColor(message))
            .addField(`:black_small_square: ${category.map(({ category }) => category)[0]}`, client.utils.chunkArray(category.map(({ name }) => name), { chunks: 3 }).map((items) => `\`${items.map((name) => client.utils.leading(name, { side: 'right', width: 15, character: ' ' })).join('')}\``).join('\n'))
          );
      }
    }
  }
};
