const larryBot = require(`../LarryBot/LarryBot.js`);
const magic8Ball = require(`../Magic8Ball/Magic8Ball.js`);
const slashCommandsController = require(`../SlashCommands/SlashCommandsController.js`);
commands = [
  {
    commandName: `//larry`,
    commandFunction: function (userMessage) {
      larryBot.sendLarryWisdom(userMessage);
    },
  },
  {
    commandName: `//8ball`,
    commandFunction: function (userMessage) {
      magic8Ball.send8BallMessage(userMessage);
    },
  },
  {
    commandName: `//whoislarry`,
    commandFunction: function (userMessage) {
      larryBot.sendLarryInfo(userMessage);
    },
  },
  {
    commandName: `//resetfunctions`,
    commandFunction: function (userMessage) {
      if (userMessage.author.username === "BearTheCoder") {
        slashCommandsController.resetSlashFunctions();
        userMessage.reply("All slash functions reset!")
      }
    },
  },
];

module.exports = { commands };
