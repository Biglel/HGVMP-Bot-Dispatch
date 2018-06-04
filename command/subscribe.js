exports.run = async (client, message) => {

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

  // Search for a role called Subscriber  
  let subrole = message.guild.roles.find(r => r.name === 'Subscriber');

  // If the role does not exist, create it with the following attributes
  if (!subrole) {
    try {
      subrole = await message.guild.createRole({
        name: 'Subscriber', // Role name
        color: 'PURPLE', // Role colour
        hoist: false, // Whether it appears separately from other roles
        permissions: [], // Permissions the role needs to have
        position: 1, // Position in the list of roles
        mentionable: false // Whether the role can be mentioned
      });
    } catch (err) {
      // If there are any problems whilst trying to mute the user, log an error
      console.log(err.stack);
    }
  }

  // If the message author already has the role
  if (message.member.roles.has(subrole.id)) {
    // Remove the role
    message.member.removeRole(subrole);
    // Delete the message
    message.delete();
    // Notify the user of the removal, delete after 3 seconds
    message.channel.send(`${message.author.username} has been removed from the ${subrole} group`).then(message => message.delete(3000));
  } else {
    // Add the role
    message.member.addRole(subrole);
    // Delete the message
    message.delete();
    // Notify the user of the addition, delete after 3 seconds    
    message.channel.send(`${message.author.username} has been added to the ${subrole} group`).then(message => message.delete(3000));
  }
};

// Set the configuration of the command
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['subscribe', 'sub'],
  permlvl: 0
};

// Set data for the help command
exports.help = {
  name: 'subscribe',
  description: 'Subscribe to useful announcements from the project.',
  usage: '!subscribe',
};