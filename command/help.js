const config = require('../config/application.json'); // We need to require our configuration file for values set

exports.run = (client, message, params) => {

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

  // If there are no arguments, display all comamnds
  if (!params[0]) {
    // Create an array from existing commands
    const commandNames = Array.from(client.commands.keys());
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);

    // Display a list of all commands stored in the array
    message.channel.send(`= Command List =\n\n[Use ${config.prefix}help <command> for details]\n\n${client.commands.map(c => `${config.prefix}${c.help.name}${' '.repeat(longest - c.help.name.length)} :: ${c.help.description}`).join('\n')}`, {
      code: 'asciidoc'
    });
  } else {
    // If the arguement is a command
    let command = params[0];

    // If the command requested exists
    if (client.commands.has(command)) {
      // Retrieve the command
      command = client.commands.get(command);
      // Display a description of that command and it's usage
      message.channel.send(`= ${command.help.name} = \n${command.help.description}\nusage::${command.help.usage}`, {
        code: 'asciidoc'
      });
    }
  }
};

// Set the configuration of the command
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['help', 'commands'],
  permlvl: 0
};

// Set data for the help command
exports.help = {
  name: 'help',
  description: 'Displays all the available commands for your permissions level.',
  usage: '!help [command]',
};