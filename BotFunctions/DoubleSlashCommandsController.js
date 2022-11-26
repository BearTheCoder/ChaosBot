const { sendLarryWisdom } = require(`./LarryBot/LarryBot.js`);
const { logCommands } = require(`./CommandController/CommandController`);

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