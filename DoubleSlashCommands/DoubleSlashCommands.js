const larryBot = require(`../LarryBot/LarryBot.js`);
// const mysqltest = require(`../mysqltest.js`);
commands = [
  {
    commandName: `//larry`,
    commandFunction: function (userMessage) {
      larryBot.sendLarryWisdom(userMessage);
    },
  },
];

module.exports = { commands };
