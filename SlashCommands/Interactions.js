require('dotenv').config();
const slashCommandsController = require(`../SlashCommands/SlashCommandsController.js`);
const subscriberBot = require(`../SubscriberBot/SubscriberBot.js`);
interactions = [
  {
    commandName: `createcommand`,
    commandFunction: async function (interaction, myClient) {
      await interaction.showModal(slashCommandsController.returnCreateCommandModal()); //sent to "interactionCreate" event listener on main
      console.log(`${interaction.user.username} has used ${this.commandName}...`)
    },
  },
  {
    commandName: `roleupdate`,
    commandFunction: async function (interaction, myClient) {
      subscriberBot.updateAllRoles(myClient, process.env.myGuildID);
      await interaction.reply("All roles are being updated...");
      console.log(`${interaction.user.username} has used ${this.commandName}...`)
    },
  },
  {
    commandName: `deletecommand`,
    commandFunction: async function (interaction, myClient) {
      slashCommandsController.deleteCommandByID(interaction);
      await interaction.reply("Command deleted...");
      console.log(`${interaction.user.username} has used ${this.commandName}...`)
    },
  },
  {
    commandName: `listcommands`,
    commandFunction: async function (interaction, myClient) {
      slashCommandsController.listCommands(interaction);
      //interaction.reply() is managed by listCommands().
      console.log(`${interaction.user.username} has used ${this.commandName}...`)
    },
  },
  {
    commandName: `coinflip`,
    commandFunction: async function (interaction, myClient) {
      let coinFlipResult = slashCommandsController.returnCoinFlipResult(interaction, myClient);
      interaction.options.getString('options') === null ? 
        await interaction.reply(`Result: ${coinFlipResult}`) :
        await interaction.reply(`
          ${interaction.options.getString('options')} \n
          Result: ${coinFlipResult}
        `);
      console.log(`${interaction.user.username} has used ${this.commandName}...`)
    },
  },
  {
    commandName: `8ball`,
    commandFunction: async function (interaction, myClient) {
      let reply = slashCommandsController.shake8Ball(interaction);
      interaction.options.getString('question') === null ? 
        await interaction.reply(`**Magic 8 Ball Says:** ${reply}`) :
        await interaction.reply(`
          ${interaction.options.getString('question')} \n
          **Magic 8 Ball Says:** ${reply}
        `);
      console.log(`${interaction.user.username} has used ${this.commandName}...`)
    },
  },
  {
    commandName: `resetcommands`,
    commandFunction: async function (interaction, myClient) {
      slashCommandsController.resetCommands(interaction)
      // interaction.reply() is managed by resetCommands()
      console.log(`${interaction.user.username} has used ${this.commandName}...`)
    },
  },
  {
    commandName: `whoislarry`,
    commandFunction: async function (interaction, myClient) {
      let reply = slashCommandsController.sendLarryInfo()
      await interaction.reply(reply);
      console.log(`${interaction.user.username} has used ${this.commandName}...`);
    },
  },
];

module.exports = { interactions };
