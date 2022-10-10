const slashCommandsController = require(`../SlashCommands/SlashCommandsController.js`);
const subscriberBot = require(`./SubscriberBot/SubscriberBot.js`);
interactions = [
  {
    commandName: `createcommand`,
    commandFunction: async function (interaction) {
      await interaction.showModal(slashCommandsController.ReturnModal());
    },
  },
  {
    commandName: `roleupdate`,
    commandFunction: async function (interaction) {
      subscriberBot.updateAllRoles();
      await interaction.reply("All roles are being updated...");
    },
  },
];

module.exports = { interactions };
