const { readFileSync } = require('fs');
const moment = require('moment');
require('moment-duration-format');

module.exports = {
  name: 'uptime',
  aliases: ['up'],
  permissions: ['EMBED_LINKS'],
  permissionLevel: 0,
  description: 'Time the client and server is awake',
  usage: '',
  category: 'bot',
  guildOnly: false,
  params: false,
  cooldown: 0,
  enabled: true,
  execute(client, message, params) {
    const uptime = process.env.NODE_ENV ? parseFloat(readFileSync('/proc/uptime', { encoding: 'utf-8' }).split(' ')[0] * 1E3) : undefined;
    const duration = moment.duration(uptime);

    let serverUptime;
    if (duration.days() < 1) serverUptime = client.util.uptime(uptime);
    else if (duration.days() == 1) serverUptime = duration.format('D [day]');
    else if (duration.days() < 10) serverUptime = duration.format('D [days]');
    else if (duration.days() >= 10) serverUptime = duration.format('DD [days]');

    message.channel.send(new client.RichEmbed()
      .setColor(client.util.hexColor(message))
      .addField(':clock4: Process', client.util.sendCode(client.util.uptime(client.uptime), { code: 'xl' }))
      .addField(':desktop: Server', client.util.sendCode(!serverUptime.startsWith('NaN') ? serverUptime : ' ', { code: 'xl' }))
    );
  }
};
