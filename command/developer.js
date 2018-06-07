const Discord = require('discord.js');
const config = require('../config/application.json'); // We need to call this file for our configuration
const packageJSON = require('../package.json'); // We need to call this file for the engine and library information

// Get the Discord.JS version, remove the ^ using slice
const discordVers = packageJSON.dependencies["discord.js"].slice(1);

exports.run = (client, message) => {

  // Set the channel we want to use as the bot channel
  const botChannel = message.guild.channels.find('id', '383850372768202753');

  // If the message is sent to the wrong channel
  if (message.channel.name !== 'bot-testing-area') {
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

    // Create the embed to show the developer information  
  const embed = new Discord.RichEmbed()
    .setAuthor(
      `HGVMP Dispatch - Developer Tools`
    )
    .setDescription(`Profile for ${client.user.username}, a multi-purpose Discord bot built on the Discord.JS library tailored for use on the HGVMP server. For any feature requests or bugs/issues, please follow the links below`)
    .setThumbnail('https://raw.githubusercontent.com/hgvmp/branding/master/facebook/Facebook%20logo%20white%20on%20blue.png')
    .setColor('#5599ff')
    .setTimestamp()
    .addField(
      'User',
      `${client.user.username}#${client.user.discriminator}`,
      true,
    )
    .addField('User ID', `${client.user.id}`, true)
    .addField(
      'Repository',
      `[Check out my source!](${config.client.self.repository})`,
      true,
    )
    .addField(
      'Bugs/Issues',
      `[Found a bug? Have a suggestion?](${config.client.self.issues})`,
      true,
    )
    .addField(
      'Trello Board (Track bugs/issues/suggestions)',
      '[Click me!](https://trello.com/b/4sRwE4MC/discord-bot)'
    )
    .addField(
      'Engine',
      `Node ${packageJSON.engines.node}`,
      true,
    )
    .addField(
      'Library',
      `Discord.JS ${discordVers}`,
      true,
    )
    .setFooter(`I am serving ${client.guilds.map(g => g.memberCount)} users, in ${client.channels.size} channels of ${client.guilds.size} guilds`);
  
  // Send the embed to the channel    
  message.channel.send(embed);
};

// Set the configuration of the command
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['developer', 'bot'],
  permlvl: 0
};

// Set data for the help command
exports.help = {
  name: 'developer',
  description: 'Creates an embed with useful information for the bot',
  usage: '!developer',
};