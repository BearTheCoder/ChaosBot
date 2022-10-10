const larryBot = require(`../LarryBot/LarryBot.js`);
const subscriberBot = require(`../SubscriberBot/SubscriberBot.js`);
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
    commandName: `//roleupdate`,
    commandFunction: function (userMessage) {
      subscriberBot.sendButtonInPM(userMessage);
    },
  },
  {
    commandName: `//createcommand`,
    commandFunction: function (userMessage) {
      // if (!userMessage.user.username === "BearTheCoder") return
      slashCommandsController.createModal();
    },
  },
  {
    commandName: `//deletecommand`,
    commandFunction: function (userMessage) {
      // if (!userMessage.user.username === "BearTheCoder") return
      console.log("Deleting command...");
    },
  },
  {
    commandName: `//deleteallcommands`,
    commandFunction: function (userMessage) {
      // if (!userMessage.user.username === "BearTheCoder") return
      slashCommandsController.deleteAllCommands();
    },
  },
  {
    commandName: `//createbasecommand`,
    commandFunction: function (userMessage) {
      // if (!userMessage.user.username === "BearTheCoder") return
      slashCommandsController.createBaseCommand();
    },
  },
];

module.exports = { commands };
