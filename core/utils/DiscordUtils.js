module.exports = {
  resolveUser(message, id) {
    if (message.mentions.members.size) {
      id = message.mentions.members.first().id;
    } else if (!isNaN(message.params[0])) {
      if (message.guild.members.cache.get(message.params[0])) {
        id = message.guild.members.cache.get(message.params[0]).id;
      } else {
        id = /^([0-9]){18}$/.test(message.params[0]) ? message.params[0] : message.member.id;
      }
    } else if (isNaN(message.params.join(' '))) {
      const members = message.guild.members.cache;
      message.params = message.params.join(' ').toLowerCase();

      id = members.map((member) => member.user.username.toLowerCase()).includes(message.params)
      ? members.find((member) => member.user.username.toLowerCase() === message.params).id
      : message.member.id;
    } else {
      id = message.member.id;
    }

    return id;
  },

  fetchAvatarURL(message, {
    format = 'png',
    dynamic = false,
    size = 2048
  } = {}) {
    const targetID = this.resolveUser(message);

    return message.client.users.fetch(targetID)
      .then((user) => user.displayAvatarURL({ format, dynamic, size }))
  }
};