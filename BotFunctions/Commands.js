// *****     Imports     *****
const SubscriberBot = require(`./SubscriberBot/SubscriberBot.js`);
const CommandController = require(`./CommandController/CommandController.js`);
const LarryBot = require("./LarryBot/LarryBot.js");
const RandoBot = require("./RandoBot/RandoBot.js");
const ContextMenu = require("./ContextMenu/ContextMenuCommands.js");

//  *****     Exports     *****
module.exports.interactions = [
  {
    commandName: `listcommands`,
    commandFunction: async function (interaction, myClient) {
      CommandController.listCommands()
        .then((embed) => interaction.reply({ embeds: [embed] }));
      console.log(`${interaction.user.username} has used ${this.commandName}...`);
    },
  },
  {
    commandName: `deletecommand`,
    commandFunction: async function (interaction, myClient) {
      CommandController.deleteCommandByID(interaction);
      await interaction.reply("Command deleted...");
      console.log(`${interaction.user.username} has used ${this.commandName}...`);
    },
  },
  {
    commandName: `roleupdate`,
    commandFunction: async function (interaction, myClient) {
      SubscriberBot.updateAllRoles(myClient, interaction.guildId);
      await interaction.reply("All roles are being updated...");
      console.log(`${interaction.user.username} has used ${this.commandName}...`);
    },
  },
  {
    commandName: `coinflip`,
    commandFunction: async function (interaction, myClient) {
      let reply = RandoBot.returnCoinFlipResult(interaction);
      await interaction.reply(reply);
      console.log(`${interaction.user.username} has used ${this.commandName}...`);
    },
  },
  {
    commandName: `8ball`,
    commandFunction: async function (interaction, myClient) {
      let reply = RandoBot.shake8Ball(interaction);
      await interaction.reply(reply);
      console.log(`${interaction.user.username} has used ${this.commandName}...`);
    },
  },
  {
    commandName: `christmas`,
    commandFunction: async function (interaction, myClient) {
      let reply = RandoBot.timeUntilChristmas();
      await interaction.reply(reply);
      console.log(`${interaction.user.username} has used ${this.commandName}...`);
    },
  },
  {
    commandName: `rubberlarry`,
    commandFunction: async function (interaction, myClient) {
      await interaction.reply("<a:aethySweat:985450674470944778> Bear hasn't quite figured this out yet...");
      // await interaction.reply("I'm listening...");
      // LarryBot.startRubberLarry(interaction, myClient);
      // console.log(`${interaction.user.username} has used ${this.commandName}...`);
    },
  },
  {
    commandName: `whoislarry`,
    commandFunction: async function (interaction, myClient) {
      let reply = LarryBot.sendLarryInfo();
      await interaction.reply(reply);
      console.log(`${interaction.user.username} has used ${this.commandName}...`);
    },
  },
  {
    commandName: `Say Hi!`,
    commandFunction: async function (interaction, myClient) {
      let reply = ContextMenu.sayHi(interaction);
      await interaction.reply(reply);
      console.log(`${interaction.user.username} has used ${this.commandName}...`);
    },
  },
  {
    commandName: `newyears`,
    commandFunction: async function (interaction, myClient) {
      let reply = RandoBot.wishHappyNewYears(interaction);
      await interaction.reply(reply);
      console.log(`${interaction.user.username} has used ${this.commandName}...`);
    },
  },
];