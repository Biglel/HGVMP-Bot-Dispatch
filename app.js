// Libraries
const Discord = require('discord.js');
const fs = require('fs');
const moment = require('moment');

// Configuration(s)
require('dotenv').config()

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};


const client = new Discord.Client({disableEveryone: true});
require('./util/eventLoader')(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./command/', (err, files) => {
  if (err) console.log(err);
  log(`Loading a total of ${files.length} command(s).`);
  files.forEach(f => {
    const props = require(`./command/${f}`);
    log(`Loading command: !${props.help.name}`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    })
  })
});

client.elevation = (message) => {
  let permlvl = 0;
  
  const modRole = message.guild.roles.find('name', 'Moderator');
  if (modRole && message.member.roles.has(modRole.id)){
    permlvl = 2;
  };

  const adminRole = message.guild.roles.find('name', 'Project Manager');
  if (adminRole && message.member.roles.has(adminRole.id)){
    permlvl = 3;
  };

  if (message.author.id === require('./config/application.json').owner.id){
    permlvl = 4;
  };
  return permlvl;
}


client.login(process.env.TOKEN);