const larryBot = require(`../LarryBot/LarryBot.js`);
// const mysqltest = require(`../mysqltest.js`);
commands = [
  {
    commandName: `//larry`,
    commandFunction: function (userMessage) {
      larryBot.sendLarryWisdom(userMessage);
    },
  },
  {
    commandName: `//whoislarry`,
    commandFunction: function (userMessage) {
      larryBot.sendLarryInfo(userMessage);
    },
  },
];

module.exports = { commands };
