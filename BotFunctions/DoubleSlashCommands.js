const { sendLarryWisdom, editHeyLarryWisdom, openAiChatCompletion_Larry, sendArtistLarry } = require(`./LarryBot/LarryBot.js`);

// Lower case letters only
module.exports.commands = [
  {
    commandName: `//larry`,
    commandFunction: (userMessage) => {
      sendLarryWisdom(userMessage);
    },
  },
  // {
  //   commandName: `//heylarry`,
  //   commandFunction: (userMessage) => {
  //     openAiChatCompletion_Larry(userMessage);
  //   },
  // },
  // {
  //   commandName: `//artistlarry`,
  //   commandFunction: (userMessage) => {
  //     sendArtistLarry(userMessage);
  //   },
  // },
  // {
  //   commandName: `editHeyLarry`,
  //   commandFunction: (inputMessage, userMessage) => {
  //     editHeyLarryWisdom(inputMessage, userMessage);
  //   },
  // },
];