const larryBot = require(`../LarryBot/LarryBot.js`);
const subscriberBot = require(`../SubscriberBot/SubscriberBot.js`);
const magic8Ball = require(`../Magic8Ball/Magic8Ball.js`);

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
    commandFunction: function () {
      //create function
      console.log("Creating command...");
    },
  },
  {
    commandName: `//deletecommand`,
    commandFunction: function () {
      //create function
      console.log("Deleting command...");
    },
  },
  {
    commandName: `//deleteallcommands`,
    commandFunction: function () {
      //create function
      console.log("Deleting all commands...");
    },
  },
];

module.exports = { commands };
