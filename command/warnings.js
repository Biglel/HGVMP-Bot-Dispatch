const fs = require("fs"); // We need to require fs, it is packaged with NodeJS so no need to download anything extra

// We need to call this file for the warning system to work properly
const warns = JSON.parse(fs.readFileSync("./storage/warnings.json", "utf8"));

module.exports.run = async (bot, message) => {

  // Get the member who sent the message  
  const wUser = message.author;

  // If the user doesn't already exist, create a ghost entry
  if (!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  // Get the amount of warnings the user has from our experience file
  const warnlevel = warns[wUser.id].warns;

  // Tell the user how many warnings they currently have
  message.channel.send(`${message.author.username}, you have ${warnlevel} warnings.`);
}

// Set the configuration of the command
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['warnings'],
  permlvl: 0
};

// Set data for the help command
exports.help = {
  name: 'warnings',
  description: 'See how many warnings you have.',
  usage: 'warnings [@user]'
};