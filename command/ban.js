// Load the DiscordJS library
const Discord = require('discord.js');

exports.run = (client, message, args) => {
  
  const reason = args.slice(1).join(' ');

  const user = message.mentions.users.first();

  const log = client.channels.find('name', 'bot-development'); // TODO: Change this to moderation-log

  if (!log)
    return message.reply(
      'I can not find a moderation log channel in this server, does one exist?'
    );

  if (reason.length < 1)
    return message.reply('You must supply a reason for banning a user.');

  if (message.mentions.users.size < 1)
    return message
      .reply('You must mention a user to ban them.')
      .catch(console.error);

  if (!message.guild.member(user).bannable)
    return message.reply('I am unable to ban that user.');
  message.guild.ban(user, 2);

  const embed = new Discord.RichEmbed()
    .setTitle(`User has been banned from the server`)
    .setDescription(`This is an automatically generated messaged`)
    .setThumbnail(`${user.avatarURL}`)
    .setColor('#FF0000')
    .setTimestamp()
    .setFooter('A copy of the reason has been sent to the user')
    .addField('User:', `${user.tag}`, true)
    .addField('Moderator:', `${message.author.tag}`, true)
    .addField('Reason:', `${reason}`);

  return client.channels.get(log.id).send({
    embed
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['b', 'ban'],
  permLevel: 2
};

exports.help = {
  name: 'ban',
  description: 'Permanantly removes a problematic user from the server.',
  usage: '!ban [@user] [reason]'
};