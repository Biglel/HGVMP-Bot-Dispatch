exports.run = (client, message) => {
  // Set the channel we want to use as the bot channel
  const botChannel = message.guild.channels.find('id', '383850372768202753');

  // If the message is sent to the wrong channel
  if (message.channel.id !== '383850372768202753') {
    // Delete the message
    message.delete();
    // Inform the user that they must use the correct channel
    return message.channel
      .send(`Whoops, it looks like you're not in the ${botChannel} channel`)
      .then(msg => {
        // Delete the bots message after 5 seconds
        msg.delete(5000);
      });
  }

  // Map the users of the guild
  const users = client.users.map(x => x.id);
  // randomize the output each time the command is run
  const output = users[Math.floor(Math.random() * users.length)];
  // Select a random user from the guild map
  const randUser = client.users.get(output);
  // Take the first user mentioned (if one)
  const user = message.mentions.users.first();

  // Set the minimum on the scale to 0
  const min = Math.ceil(0);
  // Set the maximum on the scale to 100
  const max = Math.floor(100);

  //
  const amount = Math.floor(Math.random() * (max - min)) + min;

  // If no mention was found
  if (message.mentions.users.size < 1) {
    // Pick a random user from the guild and display their love
    message.channel.send(
      `${message.author.username} loves ${randUser.username}: ${amount}/${max}`
    );
    // If a user was mentioned
  } else {
    // Display their love
    message.channel.send(
      `${message.author.username} loves ${user.username}: ${amount}/${max}`
    );
  }

  // If the result is more than or equal to 0, but less than or equal to 20
  if (amount >= 0 && amount <= 20) {
    // Maybe this match isn't the one to light the fire...
    message.channel.send(
      "Uh oh, romance isn't on the cards for you two :frowning:"
    );
    // If the result is more than or equal to 21, but less than or equal to 74
  } else if (amount >= 21 && amount <= 74) {
    // With some elbow grease, it could work... I'd keep Tinder installed though
    message.channel.send(
      "I wouldn't expect much, keep your options open... Both of you."
    );
    // If the result is more than or equal to 75, but less than or equal to 89
  } else if (amount >= 75 && amount <= 89) {
    // Now we're talking! This looks promising, well done
    message.channel.send(`Ooh, look at you two ${'(͡° ͜ʖ ͡°)'}`);
    // If the result is more than or equal to 90
  } else if (amount >= 90) {
    // Oh wow, success! Look at us, making magic happen
    message.channel.send(
      "So, when' the wedding? :bride_with_veil::skin-tone-1: :bouquet:"
    );
  }
};

// Set the configuration of the command
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

// Set data for the help command
exports.help = {
  name: 'love',
  description: 'How much do you love your fellow member?',
  usage: 'love | love [@user]'
};
