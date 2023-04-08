const { sendLarryWisdom, editHeyLarryWisdom, openAiChatCompletion_Larry } = require(`./LarryBot/LarryBot.js`);

// Lower case letters only
module.exports.commands = [
  {
    commandName: `//larry`,
    commandFunction: (userMessage, client) => {
      sendLarryWisdom(userMessage);
    },
  },
  {
    commandName: `//heylarry`,
    commandFunction: (userMessage, client) => {
      openAiChatCompletion_Larry(userMessage, client);
    },
  },
  {
    commandName: `editHeyLarry`,
    commandFunction: (inputMessage, userMessage, client) => {
      editHeyLarryWisdom(inputMessage, userMessage, client);
    },
  },
];