const Discord = require('discord.js');
const ordinal = require('ordinal');

module.exports = (member) => {
  console.log(`${member.user.username} has joined the server!`);

  const guild = member.guild;
  let count = guild.memberCount;
  count += 1;
  const ordinalCount = ordinal(count);

  const welcomeChannel = member.guild.channels.find('name', 'moderation-log');
  const rulesChannel = member.guild.channels.find('name', 'welcome-to-hgvmp-team');
  
  const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('New Member!')
    .setDescription(
      `Welcome ${member.user.username}, to the ${
        member.guild.name
      } Discord server! Please make sure you read ${rulesChannel} before posting, and enjoy your stay!`,
    )
    .setThumbnail(
      member.user.avatarURL ||
      'https://camo.githubusercontent.com/1d25b77d1fb7e3f24fe2ef0063effe1981cb3f9c/687474703a2f2f6973322e6d7a7374617469632e636f6d2f696d6167652f7468756d622f507572706c65332f76342f65332f39642f32332f65333964323339652d376237612d653362372d633762662d3163313630653937633238632f6d7a6c2e646e6563666b6e702e706e672f30783073732d38352e6a7067',
    )
    .setFooter(
      `You are the ${ordinalCount} member`
    )
    .setTimestamp()
  welcomeChannel.send({
    embed
  }).then((message) => {
    message.react("👋")
  });
};