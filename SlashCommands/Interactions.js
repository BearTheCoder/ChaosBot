require('dotenv').config();
const slashCommandsController = require(`../SlashCommands/SlashCommandsController.js`);
const subscriberBot = require(`../SubscriberBot/SubscriberBot.js`);
interactions = [
  {
    commandName: `createcommand`,
    commandFunction: async function (interaction, myClient) {
      await interaction.showModal(slashCommandsController.returnCreateCommandModal()); //sent to "interactionCreate" event listener on main
    },
  },
  {
    commandName: `roleupdate`,
    commandFunction: async function (interaction, myClient) {
      subscriberBot.updateAllRoles(myClient, process.env.myGuildID);
      console.log(`${interaction.user.username} has used roleupdate...`)
      await interaction.reply("All roles are being updated...");
    },
  },
  {
    commandName: `deletecommand`,
    commandFunction: async function (interaction, myClient) {
      slashCommandsController.deleteCommandByID(interaction);
      console.log(`${interaction.user.username} has used deletecommand...`)
      await interaction.reply("Command deleted...");
    },
  },
  {
    commandName: `listcommands`,
    commandFunction: async function (interaction, myClient) {
      slashCommandsController.listCommands(interaction);
      //interaction.reply() called on slashCommandsController...
      console.log(`${interaction.user.username} has used listcommands...`)
    },
  },
  {
    commandName: `coinflip`,
    commandFunction: async function (interaction, myClient) {
      let coinFlipResult = slashCommandsController.returnCoinFlipResult(interaction, myClient);
      console.log(`${interaction.user.username} has used coinflip...`)
      interaction.options.getString('options') === null ? 
        await interaction.reply(`Result: ${coinFlipResult}`) :
        await interaction.reply(`
          ${interaction.options.getString('options')} \n
          Result: ${coinFlipResult}
        `);
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
];

module.exports = { interactions };
