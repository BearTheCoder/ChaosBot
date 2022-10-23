require('dotenv').config();
const slashCommandsController = require(`../SlashCommands/SlashCommandsController.js`);
const subscriberBot = require(`../SubscriberBot/SubscriberBot.js`);
interactions = [
  {
    commandName: `createcommand`,
    commandFunction: async function (interaction, myClient) {
      await interaction.showModal(slashCommandsController.ReturnModal());
    },
  },
  {
    commandName: `roleupdate`,
    commandFunction: async function (interaction, myClient) {
      subscriberBot.updateAllRoles(myClient, process.env.myGuildID);
      await interaction.reply("All roles are being updated...");
    },
  },
  {
    commandName: `8ball`,
    commandFunction: async function (interaction, myClient) {
      console.log('8ball called...');
    },
  },
  {
    commandName: `coinflip`,
    commandFunction: async function (interaction, myClient) {
      slashCommandsController.returnCoinFlipResult(interaction);
      console.log(`${interaction.user.username} has used Coin Flip...`)
    },
  },
];

module.exports = { interactions };
