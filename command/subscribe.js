exports.run = (client, message) => {
  const role = message.guild.roles.find('name', 'Subscriber');

  if (message.member.roles.has(role.id)) {
    message.member.removeRole(role);
    message.delete();
    message.channel.send(`${message.author.username} has been removed from the ${role} group`).then(message => message.delete(3000));
  } else {
    message.member.addRole(role);
    message.delete();
    message.channel.send(`${message.author.username} has been added to the ${role} group`).then(message => message.delete(3000));
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['subscribe', 'sub'],
  permlvl: 0
};


exports.help = {
  name: 'subscribe',
  description: 'Subscribe to useful announcements from the project.',
  usage: '!subscribe',
};