const Discord = require('discord.js');
const fs = require('fs'); // We need to require fs, it is packaged with NodeJS so no need to download anything extra
const ms = require('ms'); // We need to require all of our packages after we install them

// We need to call this file for the warning system to work properly
const warns = JSON.parse(fs.readFileSync('./storage/warnings.json', 'utf8'));

module.exports.run = async (bot, message, args) => {
  // If the message author does not have the ability to kick other members, then we can not allow them to use the command
  if (!message.member.hasPermission('KICK_MEMBERS'))
    return message.channel.send(
      'Sorry, you lack the permissions to use this command.'
    );
  // Get the first mention from the message
  const wUser =
    message.guild.member(message.mentions.users.first()) ||
    message.guild.members.get(args[0]);
  // Get the first mention from the message (used for the embed)
  const user = message.mentions.users.first();

  // If the mentioned user does not exist, notify the command user
  if (!wUser) return message.channel.send('That user does not exist.');
  // If the mentioned user has the ability to manage messages, they can not be sanctioned
  if (wUser.hasPermission('MANAGE_MESSAGES'))
    return message.channel.send('That user can not be warned.');
  // Take everyhing after the mentioned user, and join it
  const reason = args.join(' ').slice(22);
  if (!reason){
    message.channel.send('[ERROR] You must supply a reason when warning a user');
    return;
  }  

  // Create a template for our stored warnings if a value does not already exist
  if (!warns[wUser.id])
    warns[wUser.id] = {
      username: user.username,
      warns: 0
    };

  // Increase the warning count by one each time a user gets warned
  warns[wUser.id].warns += 1;

  // Create the embed to show a user has been warned
  const warnEmbed = new Discord.RichEmbed()
    .setTitle(`User has been given a warning`)
    .setDescription(`This is an automatically generated message`)
    .setThumbnail(`${user.avatarURL}`)
    .setColor('#FFFF00')
    .setTimestamp()
    .setFooter('A copy of the reason has been sent to the user')
    .addField('User:', `${user.tag} (${warns[wUser.id].warns})`, true)
    .addField('Moderator:', `${message.author.tag}`, true)
    .addField('Reason:', `${reason}`);

  // Set the channel we want to use as the moderation channel
  const warnchannel = message.guild.channels.find(`name`, 'moderation-log');
  // If the channel does not exist, notify the user
  if (!warnchannel) return message.channel.send("Couldn't find channel");

  // Send the embed to the moderation channel
  warnchannel.send(warnEmbed);

  // If the mentioned user reaches 3 warnings
  if (warns[wUser.id].warns === 3) {
    // Search for a role called Muted
    let muterole = message.guild.roles.find(r => r.name === 'Muted');

    // If the role does not exist, create it with the following attributes
    if (!muterole) {
      try {
        muterole = await message.guild.createRole({
          name: 'Muted', // Role name
          color: 'BLACK', // Role colour
          hoist: true, // Whether it appears separately from other roles
          permissions: [], // Permissions the role needs to have
          position: 2, // Position in the list of roles
          mentionable: false // Whether the role can be mentioned
        });

        // Go through each channel and overwrite permissions
        message.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(muterole, {
            CHANGE_NICKNAME: false, // Can NOT change their nickname
            SEND_MESSAGES: false, // Can NOT send messages
            SEND_TTS_MESSAGES: false, // Can NOT send text-to-speech messages
            ADD_REACTIONS: false, // Can NOT add reactions
            SPEAK: false, // Can NOT speak in voice channels
            USE_VAD: false // Can NOT use voice activation (forces push-to-talk)
          });
        });
      } catch (err) {
        // If there are any problems whilst trying to mute the user, log an error
        console.log(err.stack);
      }
    }

    // Set the timer for which the user will be muted for
    const mutetime = '5s';

    // Add the mentioned user to the muted role, then notify the channel
    await wUser
      .addRole(muterole)
      .then(
        message.channel.send(
          `<@${wUser.id}> has been temporarily muted for 30 minutes.`
        )
      );

    // Wait until the duration has ended, and perform the actions listed
    setTimeout(() => {
      // Remove the role from the user
      wUser.removeRole(muterole);
      // Notify the channel of the action
      message.channel.send(`<@${wUser.id}> has been unmuted.`);
    }, ms(mutetime));
  }

  // If the mentioned user reaches 4 warnings
  if (warns[wUser.id].warns === 4) {
    // Kick the user, attatch the reason
    message.guild.member(wUser).kick(reason);
    // Notify the channel of the action
    message.channel.send(`<@${wUser.id}> has been kicked.`);
  }

  // If the mentioned user reaches 5 or more warnings (just a precaution)
  if (warns[wUser.id].warns >= 5) {
    // Ban the user, attatch the reason
    message.guild.member(wUser).ban(reason);
    // Reset their warnings to zero, they may be unbanned in the future
    warns[wUser.id].warns = 0;
    // Notify the channel of the action
    message.channel.send(`<@${wUser.id}> has been banned.`);
  }

  // Write the changes to our warnings file
  fs.writeFile(
    './storage/warnings.json',
    JSON.stringify(warns, null, 4),
    err => {
      // If there are any problems whilst trying to update the warnings, log an error
      if (err) console.log(err);
    }
  );
};

// Set the configuration of the command
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['warn'],
  permlvl: 2
};

// Set data for the help command
exports.help = {
  name: 'warn',
  description: 'Gives a troublesome user a warning.',
  usage: 'warn [@user] [reason]'
};
