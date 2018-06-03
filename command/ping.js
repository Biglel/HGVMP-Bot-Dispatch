exports.run = function(client, message) {
  message.channel.send(`Pong! This message took \`${Date.now() - message.createdTimestamp}ms\` to be delivered to you. Wow!`);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ping'],
  permlvl: 0
};


exports.help = {
  name: 'ping',
  description: 'Get statistics for your ping.',
  usage: '!ping',
};