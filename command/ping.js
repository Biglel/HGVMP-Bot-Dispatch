exports.run = function (client, message) {

  // Set the channel we want to use as the bot channel
  const botChannel = message.guild.channels.find('id', '383850372768202753');

  // If the message is sent to the wrong channel
  if (message.channel.id !== '383850372768202753') {
    // Delete the message
    message.delete();
    // Inform the user that they must use the correct channel
    return message.channel.send(
      `Whoops, it looks like you're not in the ${botChannel} channel`
    ).then(msg => {
      // Delete the bots message after 5 seconds
      msg.delete(5000);
    });
  }

  // Notify the user of their ping
  message.channel.send(`Pong! This message took \`${Date.now() - message.createdTimestamp}ms\` to be delivered to you. Wow!`);
};

// Set the configuration of the command
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['ping'],
  permlvl: 0
};

// Set data for the help command
exports.help = {
  name: 'ping',
  description: 'Get statistics for your ping.',
  usage: '!ping',
};