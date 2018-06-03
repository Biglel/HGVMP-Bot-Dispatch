const Discord = require('discord.js');

exports.run = (client, message, args) => {
  const reason = args.slice(1).join(' ');
  const user = message.mentions.users.first();
  const log = client.channels.find('name', 'bot-development'); // TODO: Change this to moderation-log

  if (!log) return message.reply('I can not find a moderation log channel in this server, does one exist?');
  if (reason.length < 1) return message.reply('You must supply a reason for warning a user.');
  if (message.mentions.users.size < 1) return message.reply('You must mention a user to warn them.').catch(console.error);

  user.send(`You have been issued a warning by ${message.author} for the following reason:\n\n_${reason}_\n\nIf you have any problems with this warning, contact the team member that issued it directly.`);

  const embed = new Discord.RichEmbed()
    .setTitle(`User has been given a warning`)
    .setDescription(`This is an automatically generated message`)
    .setThumbnail(`${user.avatarURL}`)
    .setColor('#FFFF00')
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
  aliases: ['w', 'warn'],
  permLevel: 2
};


exports.help = {
  name: 'warn',
  description: 'Issues a warning to the mentioned user.',
  usage: '!warn [@user] [reason]',
};