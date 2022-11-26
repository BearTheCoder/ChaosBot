// *****     Imports     *****
const { larryWisdomLines } = require(`./LarryWisdom.js`);
const { rubberLarryPhrases } = require(`./RubberLarryPhrases.js`);

// *****     Exports     *****
module.exports.sendLarryWisdom = async (userMessage) => {
  let reply =
    larryWisdomLines[Math.floor(Math.random() * larryWisdomLines.length)];
  console.log(`User ${userMessage.author.username} has called for Larry`);
  await userMessage.reply(
    `<:phweeLarry:1023966100226060339> **Larry says:** ${reply}`
  );
};

module.exports.startRubberLarry = (interaction, myClient) => {
  let rubberLarryArgs = { interaction, myClient, typingTimeout: null, canReply: false, };

  rubberLarryArgs.myClient.on(`messageCreate`, (userMessage) => {
    rubberLarryListener(userMessage, rubberLarryArgs);
  });

  rubberLarryArgs.myClient.on('typingStart', (typing) => {
    if (typing.channel.name === interaction.channel.name && typing.user.username === interaction.user.username) {
      if (rubberLarryArgs.typingTimeout !== null) { clearTimeout(rubberLarryArgs.typingTimeout); }
      rubberLarryArgs.typingTimeout = setTimeout(() => {
        if (rubberLarryArgs.canReply) {
          const randNum = Math.floor(Math.random() * rubberLarryPhrases.length);
          typing.channel.send(`<:phweeLarry:1023966100226060339> ${rubberLarryPhrases[randNum]}`);
          rubberLarryArgs.canReply = false;
        }
      }, 8000);
    }
  });
};

module.exports.sendLarryInfo = () => `<:phweeLarry:1023966100226060339> https://phwee-larry.carrd.co/`;

// *****     Internal Functions     *****
async function rubberLarryListener(userMessage, rubberLarryArgs) {
  const isInSameChannel = (userMessage.channel.name === rubberLarryArgs.interaction.channel.name);
  const hasSameAuthor = (userMessage.author.username === rubberLarryArgs.interaction.user.username);
  if (hasSameAuthor && isInSameChannel) {
    rubberLarryArgs.canReply = true;
    if (userMessage.content.includes("//amen") || userMessage.content.includes("//stop")) {
      await userMessage.reply(`<:phweeLarry:1023966100226060339> May Larry be with you.`);
      stopRubberLarry(rubberLarryArgs);
    }
  }
}

function stopRubberLarry(rubberLarryArgs) {
  rubberLarryArgs.myClient.removeListener(rubberLarryListener, () => console.log("/rubberlarry has stopped..."));
  clearTimeout(rubberLarryArgs.typingTimeout);
}
