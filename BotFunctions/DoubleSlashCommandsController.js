const { sendLarryWisdom } = require(`./LarryBot/LarryBot.js`);

module.exports.commands = [
  {
    commandName: `//larry`,
    commandFunction: (userMessage) => {
      sendLarryWisdom(userMessage);
    },
  },
];