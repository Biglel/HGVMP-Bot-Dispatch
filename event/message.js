const config = require('../config/application.json');

module.exports = async (message) => {
  const {client} = message;

  if (message.author.bot) return;

  const command = message.content.split(' ')[0].slice(config.prefix.length);
  const params = message.content.split(' ').slice(1);
  const perms = client.elevation(message);
  let cmd;

  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permlvl) {
      message.author.send(['ERROR: Permission denied']);
      message.delete();
    } else {
      cmd.run(client, message, params, perms);
    }
  }
};