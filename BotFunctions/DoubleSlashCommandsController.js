const { sendLarryWisdom, logCommands } = require(`./LarryBot/LarryBot.js`);

module.exports.commands = [
  {
    commandName: `//larry`,
    commandFunction: (userMessage) => {
      sendLarryWisdom(userMessage);
    },
  },
  {
    commandName: `//logCommands`,
    commandFunction: () => {
      logCommands();
    },
  },
];