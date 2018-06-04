const Discord = require('discord.js');
const fs = require('fs'); // We need to require fs, it is packaged with NodeJS so no need to download anything extra
const moment = require('moment'); // We need to require all of our packages after we install them

// Environment variables
require('dotenv').config()

// Use moment to format our console.log output
const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

// Create our bot, set the variable to anything you want. This could be fish...
const client = new Discord.Client({disableEveryone: true});

// Load our event listener, otherwise events will not fire
require('./util/eventLoader')(client);


// COMMANDS & ALIASES
// Create a new collection of commands
client.commands = new Discord.Collection();
// Create a new collection of aliases
client.aliases = new Discord.Collection();

// Read the command directory for all our commands
fs.readdir('./command/', (err, files) => {
  // If there's a problem, log an error to the console
  if (err) console.log(err);
  // Log to the console that commands are preparing to be loaded
  log(`Loading a total of ${files.length} command(s).`);
  files.forEach(f => {
    // Store each command file as a variable
    const props = require(`./command/${f}`);
    // Log to the console each command found based on the name in exports.help
    log(`Loading command: !${props.help.name}`);


    client.commands.set(props.help.name, props);
    // Go through each command found and look for an alias value
    props.conf.aliases.forEach(alias => {
      // For each value found, attatch it to the help command
      client.aliases.set(alias, props.help.name);
    })
  })
});


// PERMISSIONS & ELEVATION
client.elevation = (message) => {
  // Set the base permission level to 0 (all users)
  let permlvl = 0;
  
  // Look for a moderation role on the guild
  const modRole = message.guild.roles.find('name', 'Discord Moderator');
  // If the role exits, and the message author has the role
  if (modRole && message.member.roles.has(modRole.id)){
    // Set the permission level to 2 (Discord Moderator)
    permlvl = 2;
  };

  // Look for an administration role on the guild
  const adminRole = message.guild.roles.find('name', 'Project Manager');
  // If the role exits, and the message author has the role  
  if (adminRole && message.member.roles.has(adminRole.id)){
    // Set the permission level to 3 (Project Manager)    
    permlvl = 3;
  };

  // Check if the message author has the same ID as the owner defined in our configuration file
  if (message.author.id === require('./config/application.json').owner.id){
    // If the ID matches, set the permission level to 4 (Synplex)
    permlvl = 4;
  };

  // Return the correct pemission level based on the command sent
  return permlvl;
}

// Log the bot into the wonderful world of Discord
client.login(process.env.TOKEN);