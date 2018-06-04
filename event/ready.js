module.exports = async (client) => {
  // Log to the console that the bot is online
  console.log(`\nBreaker breaker 1-9: ${client.user.username} is now online, 10-65`);

  // INVITE LINK
  try {
    // Generate an invite link with administrator permissions
    const link = await client.generateInvite(['ADMINISTRATOR']);
    // Log the invite link to the console
    console.log(`\nInvite link: ${link}`);
  } catch (e) {
    // If there's a problem, log an error to the console
    console.log(e.stack);
  }

  // BOT PROFILE
  client.user
    // Set the status of the bot to online
    .setStatus('online')
    .then(
      // Log how many guilds and users the bot is online with
      console.log(
        `\n${client.user.username} is online with ${
          client.guilds.map(g => g.memberCount)
        } users, in ${client.channels.size} channels of ${
          client.guilds.size
        } guilds`,
      ),
    )
    // If there's a problem, log an error to the console    
    .catch(console.error);

    // Set the activity of the bot to playing a game
    client.user.setActivity('Euro Truck Simulator 2')
};