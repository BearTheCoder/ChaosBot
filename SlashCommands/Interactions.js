const slashCommandsController = require(`../SlashCommands/SlashCommandsController.js`);
interactions = [
  {
    commandName: `createcommand`,
    commandFunction: async function (interaction) {
      await interaction.showModal(slashCommandsController.ReturnModal());
    },
  },
];

module.exports = { interactions };
