const { readFileSync } = require('fs');
const moment = require('moment');
require('moment-duration-format');

module.exports = {
  name: 'uptime',
  aliases: ['up'],
  description: 'Time the client and server is awake',
  category: 'bot',
  requirements: { botPermissions: ['EMBED_LINKS'] },
  execute(client, message, params) {
    let uptime = {
      process: client.utils.uptime(process.uptime() * 1E3),
      shard: client.utils.uptime(client.uptime)
    };

    const writeServerUptime = (server) => Object.assign(uptime, { server });

    if (process.env.NODE_ENV) {
      const proc = parseFloat(readFileSync('/proc/uptime', { encoding: 'utf-8' }).split(' ')[0] * 1E3);
      const duration = moment.duration(proc);

      if (duration.days() < 1) writeServerUptime(client.utils.uptime(proc));
      else if (duration.days() == 1) writeServerUptime(duration.format('D [day]'));
      else if (duration.days() < 10) writeServerUptime(duration.format('D [days]'));
      else if (duration.days() >= 10) writeServerUptime(duration.format('DD [days]'));
    } else {
      writeServerUptime('Not in production');
    }

    message.channel.send(new client.MessageEmbed()
      .setColor(client.utils.hexColor(message))
      .addField(':clock4: Process', client.utils.sendCode(uptime.process, { code: 'xl' }))
      .addField(':large_blue_diamond: Shard', client.utils.sendCode(uptime.shard, { code: 'xl' }))
      .addField(':desktop: Server', client.utils.sendCode(uptime.server, { code: 'xl' }))
    );
  }
};
