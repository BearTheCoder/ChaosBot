const { sendLarryWisdom } = require(`./LarryBot/LarryBot.js`);
const { logCommands } = require(`./CommandController/CommandController`);

// Lower case letters only
module.exports.commands = [
  {
    commandName: `//larry`,
    commandFunction: (userMessage) => {
      sendLarryWisdom(userMessage);
    },
  },
  {
    commandName: `//logcommands`,
    commandFunction: () => {
      logCommands();
    },
  },
];