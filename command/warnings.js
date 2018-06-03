const fs = require("fs");

const warns = JSON.parse(fs.readFileSync("./storage/warnings.json", "utf8"));

module.exports.run = async (bot, message) => {
  const wUser = message.author;
  const warnlevel = warns[wUser.id].warns;

  if (typeof warns[wUser.id].warns === "undefined") {
    message.channel.send(`${message.author.username}, you have zero warnings.`);
  } else {
    message.channel.send(`${message.author.username}, you have ${warnlevel} warnings.`);
  }
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['warnings'],
  permlvl: 0
};

exports.help = {
  name: 'warnings',
  description: 'See how many warnings you have.',
  usage: 'warnings [@user]'
};