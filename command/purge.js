exports.run = async (client, message) => {
  const messageTotal = parseInt(100, 0);

  message.channel
    .fetchMessages({
      limit: messageTotal
    })
    .then(messages => {
      message.channel.bulkDelete(messages);
      message.channel
        .send(
          `Deletion of messages successful. Including the command issued by ${message.author}.\n\nThis message will be removed shortly.`
        )
        .then(message => message.delete(5000));
      console.log(
        `Channel purged by ${message.author.tag} has successfully been cleaned of messages. ${client.user.username} has notified the guild.`
      );
    })
    .catch(err => {
      console.log('Error while attempting to purge the channel.');
      console.log(err);
    });
};


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['clear', 'purge', 'clean'],
  permlvl: 3
};


exports.help = {
  name: 'purge',
  description: 'Clears the current channel the command is executed in.',
  usage: '!purge',
};