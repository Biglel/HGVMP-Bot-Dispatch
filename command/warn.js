const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");

const warns = JSON.parse(fs.readFileSync("./storage/warnings.json", "utf8"));

module.exports.run = async (bot, message, args) => {
  if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("No can do pal!");
  const wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
  const user = message.mentions.users.first();
  if (!wUser) return message.channel.send("That user does not exist.");
  if (wUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That user can not be warned.");
  const reason = args.join(" ").slice(22);

  if (!warns[wUser.id]) warns[wUser.id] = {
    username: user.username,
    warns: 0
  };

  warns[wUser.id].warns += 1;

  fs.writeFile("./storage/warnings.json", JSON.stringify(warns, null, 4), (err) => {
    if (err) console.log(err)
  });

  const warnEmbed = new Discord.RichEmbed()
    .setTitle(`User has been given a warning`)
    .setDescription(`This is an automatically generated messaged by Aoki`)
    .setThumbnail(`${user.avatarURL}`)
    .setColor('#FFFF00')
    .setTimestamp()
    .setFooter('A copy of the reason has been sent to the user')
    .addField(
    'User:',
    `${user.tag} (${warns[wUser.id].warns})`,
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

  const warnchannel = message.guild.channels.find(`name`, "moderation-log");
  if (!warnchannel) return message.channel.send("Couldn't find channel");

  warnchannel.send(warnEmbed);

  if (warns[wUser.id].warns === 3) {
    let muterole = message.guild.roles.find(r => r.name === "Muted");
    if (!muterole) {
      try {
        muterole = await message.guild.createRole({
          name: "Muted",
          color: "#000000",
          permissions: [],
          position: 2,
          mentionable: false
        });
        message.guild.channels.forEach(async (channel) => {
          await channel.overwritePermissions(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          });
        });
      } catch (err) {
        console.log(err.stack);
      }
    }

    const mutetime = "2s";
    await (wUser.addRole(muterole)).then(message.channel.send(`<@${wUser.id}> has been temporarily muted`));

    setTimeout(() => {
      wUser.removeRole(muterole)
      message.channel.send(`<@${wUser.id}> has been unmuted.`)
    }, ms(mutetime))
  }
  if (warns[wUser.id].warns === 4) {
    message.guild.member(wUser).kick(reason);
    message.channel.send(`<@${wUser.id}> has been kicked.`)
  }
  if (warns[wUser.id].warns === 5) {
    message.guild.member(wUser).ban(reason);
    message.channel.send(`<@${wUser.id}> has been banned.`)
  }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['warn'],
  permlvl: 2
};

exports.help = {
  name: 'warn',
  description: 'Gives a troublesome user a warning.',
  usage: 'warn [@user] [reason]'
};