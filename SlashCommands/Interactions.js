// const aws = require(`aws-sdk`); // Needed for hidden variables using Heroku
// const s3 = new aws.S3({
//   myGuildID: process.env.GuildID,
// });
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
      // subscriberBot.updateAllRoles(myClient, s3.config.myGuildID);
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
];

module.exports = { interactions };
