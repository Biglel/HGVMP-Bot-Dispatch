const Discord = require('discord.js');
const ta = require("time-ago"); // We need to require all of our packages after we install them
const dateformat = require("dateformat"); // We need to require all of our packages after we install them
const experience = require('../storage/experience.json'); // We need to require our experience file for the information stored

exports.run = async (bot, message) => {

  // Delete the message sent by the user (to reduce spam)
  message.delete();

  // If the user doesn't already exist, create a ghost entry for use later
  if(!experience[message.author.id]){
    experience[message.author.id] = {
      experience: 0,
      level: 1
    };
  }


  // Get their current experience based on the entry in experience.json
  const currExperience = experience[message.author.id].experience;
  // Get their current level based on the entry in experience.json
  const currLevel = experience[message.author.id].level;

  // Get the member who sent the message
  const member = message.guild.member(message.author);

  // Create the embed to show their user information 
  const embed = new Discord.RichEmbed()
    .setTitle(`Discord profile for ${message.author.username}`)
    .setThumbnail(`${message.author.displayAvatarURL}`)
    .setDescription(
      "Interested to see how you fair against your fellow members?\n",
    )
    .setColor("#5599ff")
    .setTimestamp()
    .addField(
      "User",
      `${message.author.username}#${message.author.discriminator}`,
      true,
    )
    .addField("User ID", `${message.author.id}`, true)
    .addField(
      "Joined Discord",
      `${dateformat(
        message.author.createdAt,
        "dd mmmm yyyy hh:mm",
        true,
      )}\n${ta.ago(message.author.createdAt)}`,
      true,
    )
    .addField(
      "Joined Server",
      `${dateformat(member.joinedAt, "dd mmmm yyyy hh:mm", true)}\n${ta.ago(
        member.joinedAt,
      )}`,
      true,
    )
    .addField(
      "Role(s)",
      `${member.roles
        .filter(r => r.id !== message.guild.id)
        .map(roles => `\`${roles.name}\``)
        .join(" **|** ") || "No Roles"}`,
    )
    .addField('Level', currLevel, true)
    .addField('Experience', currExperience, true)

  // Send the embed to the channel
  message.channel.send(embed);
}

// Set the configuration of the command
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["uinfo"],
  permlvl: 0,
};

// Set data for the help command
exports.help = {
  name: "userinfo",
  description: "Shows information of your account on our Discord Server",
  usage: "userinfo",
};