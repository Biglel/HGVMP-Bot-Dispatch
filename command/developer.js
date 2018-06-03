const Discord = require('discord.js');
const config = require('../config/application.json');
const packageJSON = require('../package.json');

const discordVers = packageJSON.dependencies["discord.js"].slice(1);

exports.run = (client, message) => {
  const embed = new Discord.RichEmbed()
    .setAuthor(
      `HGVMP Dispatch - Developer Tools`
    )
    .setDescription(`Profile for ${client.user.username}, a multi-purpose Discord bot built on the Discord.JS library tailored for use on the HGVMP server. For any feature requests or bugs/issues, please follow the links below`)
    .setThumbnail(`${client.user.avatarURL}`)
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
      `${config.client.self.repository}`,
      true,
    )
    .addField(
      'Bugs/Issues',
      `${config.client.self.issues}`,
      true,
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
    .setFooter(`I am serving ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds`);
  message.channel.send(embed);
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['developer', 'bot'],
  permlvl: 0
};


exports.help = {
  name: 'developer',
  description: 'Creates an embed with useful information for the bot',
  usage: '!developer',
};