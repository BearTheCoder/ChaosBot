// *****     Imports     *****
const SubscriberBot = require(`./SubscriberBot/SubscriberBot.js`);
const CommandController = require(`./CommandController/CommandController.js`);
const LarryBot = require("./LarryBot/LarryBot.js");
const RandoBot = require("./RandoBot/RandoBot.js");

//  *****     Exports     *****
module.exports.interactions = [
  {
    commandName: `createcommand`,
    commandFunction: async function (interaction, myClient) {
      await interaction.showModal(CommandController.returnCreateCommandModal());
      console.log(`${interaction.user.username} has used ${this.commandName}...`);
    },
  },
  {
    commandName: `listcommands`,
    commandFunction: function (interaction, myClient) {
      CommandController.listCommands()
        .then((reply) => interaction.reply(reply)); //Huh?? Might not work
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
    commandName: `resetcommands`,
    commandFunction: async function (interaction, myClient) {
      CommandController.resetCommands()
        .then((reply) => interaction.reply(reply)); //Huh?? Might not work
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
      await interaction.reply("I'm listening...");
      LarryBot.startRubberLarry(interaction, myClient);
      console.log(`${interaction.user.username} has used ${this.commandName}...`);
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
];