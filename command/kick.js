const Discord = require('discord.js');

exports.run = (client, message, args) => {
  const reason = args.slice(1).join(' ');
  const user = message.mentions.users.first();
  const log = client.channels.find('name', 'moderation-log');

  if (!log) return message.reply('I can not find a moderation log channel in this server, does one exist?');
  if (reason.length < 1) return message.reply('You must supply a reason for kicking a user.');
  if (message.mentions.users.size < 1) return message.reply('You must mention a user to kick them.').catch(console.error);

  if (!message.guild.member(user).kickable) return message.reply('I am unable to kick that user.');

  const embed = new Discord.RichEmbed()
    .setTitle(`User has been kicked from the server`)
    .setDescription(`This is an automatically generated message`)
    .setThumbnail(`${user.avatarURL}`)
    .setColor('#FFA500')
    .setTimestamp()
    .setFooter('A copy of the reason has been sent to the user')
    .addField(
      'User:',
      `${user.tag}`,
      true,
    )
    .addField(
      'Moderator:',
      `${message.author.tag}`,
      true,
    )
    .addField(
      'Reason:',
      `${reason}`,
    )

  return client.channels.get(log.id).send({
    embed
  });
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['k', 'kick'],
  permLevel: 2
};


exports.help = {
  name: 'kick',
  description: 'Removes a problematic user from the server.',
  usage: '!kick [@user] [reason]',
};