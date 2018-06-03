module.exports = async (client) => {
  console.log(`\nBreaker breaker 1-9: ${client.user.username} is now online, 10-65`);

  
  try {
    const link = await client.generateInvite(['ADMINISTRATOR']);
    console.log(`\nInvite link: ${link}`);
  } catch (e) {
    console.log(e.stack);
  }

  client.user
    .setStatus('online')
    .then(
      console.log(
        `\n${client.user.username} is online with ${
          client.guilds.map(g => g.memberCount)
        } users, in ${client.channels.size} channels of ${
          client.guilds.size
        } guilds`,
      ),
    )
    .catch(console.error);

    client.user.setActivity('Euro Truck Simulator 2')

  client.generateInvite(['ADMINISTRATOR']);
};
// End of Ready Event