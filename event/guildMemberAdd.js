const Discord = require('discord.js');
const ordinal = require('ordinal'); // We need to require all of our packages after we install them

module.exports = (member) => {
  // Log to the console when a new user joins the guild
  console.log(`${member.user.username} has joined the server!`);

  // Store member.guild as guild to prevent long statements
  const {guild} = member.guild;
  // Take the current number of users from the guild
  let count = guild.memberCount;
  // Increase the count by 1
  count += 1;
  const ordinalCount = ordinal(count);

  // Set the channel we want to use as the greeting channel
  const welcomeChannel = member.guild.channels.find('name', 'welcome');
  // Set the channel we want to use as the rules channel
  const rulesChannel = member.guild.channels.find('name', 'rules');
  // Set the channel we want to use as the questions channel  
  const questionsChannel = member.guild.channels.find('name', 'questions');
  
  // Create the embed to show a new user has joined the guild
  const embed = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('New Member!')
    .setDescription(
      `Welcome ${member.user.username}, to the ${member.guild.name} Discord server! Please make sure you read ${rulesChannel} before posting, if you have any questions be sure to check out ${questionsChannel}. Enjoy your stay `,
    )
    .setThumbnail(
      member.user.avatarURL ||
      'https://camo.githubusercontent.com/1d25b77d1fb7e3f24fe2ef0063effe1981cb3f9c/687474703a2f2f6973322e6d7a7374617469632e636f6d2f696d6167652f7468756d622f507572706c65332f76342f65332f39642f32332f65333964323339652d376237612d653362372d633762662d3163313630653937633238632f6d7a6c2e646e6563666b6e702e706e672f30783073732d38352e6a7067',
    )
    .setFooter(
      `You are the ${ordinalCount} member`
    )
    .setTimestamp()
  
  // Send the embed to the channel, then react to welcome them
  welcomeChannel.send({embed}).then((message) => {
    message.react("👋")
  });
};