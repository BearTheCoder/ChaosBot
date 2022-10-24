const larryBot = require(`../LarryBot/LarryBot.js`);

commands = [
  {
    commandName: `//larry`,
    commandFunction: function (userMessage) {
      larryBot.sendLarryWisdom(userMessage);
    },
  },
];

module.exports = { commands };
