const { sendLarryWisdom, sendHeyLarryWisdom, editHeyLarryWisdom } = require(`./LarryBot/LarryBot.js`);

// Lower case letters only
module.exports.commands = [
  {
    commandName: `//larry`,
    commandFunction: (userMessage) => {
      sendLarryWisdom(userMessage);
    },
  },
  {
    commandName: `//heylarry`,
    commandFunction: (userMessage) => {
      sendHeyLarryWisdom(userMessage);
    },
  },
  {
    commandName: `editHeylarry`,
    commandFunction: (inputMessage, userMessage) => {
      editHeyLarryWisdom(inputMessage, userMessage);
    },
  },
];